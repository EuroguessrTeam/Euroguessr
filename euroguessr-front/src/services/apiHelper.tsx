import { API } from "./api";
import Cookies from 'js-cookie';

export interface Guess {
    video_id: string;
    seek_to: number;
}

export interface Score {
    date: Date;
    attempts: number;
    win: boolean;
}

export type LeaderboardType = "DAILY" | "TRAINING";

export interface UsersLeaderboardEntry {
    rank: number;
    username: string;
    score: number;
}

export interface ErrorResponse {
    code: number;
    message: string;
}

export interface AccountDTO {
    id : string;
    username: string;
}

export class APIHelper {

    static getAccountId(): string | undefined {
        return Cookies.get('Euroguessr_Account_Id');
    }

    static setAccountId(accountId: string): void {
        APIHelper.setCookie('Euroguessr_Account_Id', accountId, 365)
    }

    static setCookie(cName: string, cValue: string, expDays: number) {
        const date = new Date();
        date.setTime(date.getTime() + (expDays * 24 * 60 * 60 * 1000));
        const expires = "expires=" + date.toUTCString();
        document.cookie = cName + "=" + cValue + "; " + expires + "; path=/";
    }

    static async getAccount(accountId: string): Promise<AccountDTO> {
        return API.getInstance().get("account", accountId).then((response) => {
            return response;
        }).catch((error) => {
            APIHelper.treatError(error);
            return undefined;
        });
    }

    static async changeUsername(newUsername: string): Promise<boolean> {
        return API.getInstance()
            .post(
            "account/username?newUsername=" + newUsername,
            "",
            await APIHelper.getCurrentOrCreateNewAccount()
            )
            .then((response) => response.usernameChanged)
            .catch((error) => {
            APIHelper.treatError(error);
            return false;
        });
    }

    static async getCurrentOrCreateNewAccount(): Promise<string> {
        const currentAccount = APIHelper.getAccountId();

        // Return the current account if it exists
        if (currentAccount) {
            const accountExists = await APIHelper.accountExists(currentAccount);
            if(accountExists) return currentAccount;
        }
        
        // Else create a new account
        return await API.getInstance().get("account/new", undefined).then((response) => {
            const newAccount = response.accountId;
            APIHelper.setAccountId(newAccount);
            return newAccount;
        }).catch((error) => {
            APIHelper.treatError(error);
            return "";
        });
    }

    static async accountExists(accountId: string | undefined): Promise<boolean> {
        return await API.getInstance().get("account/check", accountId).then((response) => {
            return response.accountExists;
        }).catch((error) => {
            APIHelper.treatError(error);
            return undefined;
        });
    }

    static async getDailyGuess(): Promise<Guess> {
        return await API.getInstance().get("song/daily", undefined).then((response) => {
            return response;
        }).catch((error) => {
            APIHelper.treatError(error);
            return undefined;
        });
    }

    static async getTrainingGuess(): Promise<Guess> {
        return await API.getInstance().get(`account/training/guess/get?next=false`, await APIHelper.getCurrentOrCreateNewAccount()).then((response) => {
            return response;
        }).catch((error) => {
            APIHelper.treatError(error);
            return undefined;
        });
    }

    static async skipTrainingGuess(): Promise<boolean> {
        return await API.getInstance().get(`account/training/guess/get?next=true`, await APIHelper.getCurrentOrCreateNewAccount()).then(() => {
            return true;
        }).catch((error) => {
            APIHelper.treatError(error);
            return false;
        });
    }

    static async sendDailyGuess(songId: number): Promise<boolean> {
        return await API.getInstance().post(`account/daily/guess/submit?songId=${songId}`, "", await APIHelper.getCurrentOrCreateNewAccount()).then((response) => {
            return response.result;
        }).catch((error) => {
            APIHelper.treatError(error);
            return false;
        });
    }

    static async sendTrainingGuess(songId: number): Promise<boolean> {
        return await API.getInstance().post(`account/training/guess/submit?songId=${songId}`, "", await APIHelper.getCurrentOrCreateNewAccount()).then((response) => {
            return response.result;
        }).catch((error) => {
            APIHelper.treatError(error);
            return false;
        });
    }

    static async getDailyScore(): Promise<Score> {
        return await API.getInstance().get("account/daily/score/today", await APIHelper.getCurrentOrCreateNewAccount()).then((response) => {
            return response;
        }).catch((error) => {
            APIHelper.treatError(error);
            return undefined;
        });
    }

    static async getTrainingScore(): Promise<Score> {
        return await API.getInstance().get("account/training/score/last", await APIHelper.getCurrentOrCreateNewAccount()).then((response) => {
            return response;
        }).catch((error) => {
            APIHelper.treatError(error);
            return undefined;
        });
    }

    static async getDailyScores(month:number, year:number): Promise<Score[]> {
        return await API.getInstance().get(`account/daily/score/all?month=${month}%2F01%2F${year}`, await APIHelper.getCurrentOrCreateNewAccount()).then((response) => {
            return response;
        }).catch((error) => {
            APIHelper.treatError(error);
            return undefined;
        });
    }

    // Leaderboards
    static async getLeaderboardPages(type: LeaderboardType): Promise<number> {
    return await API.getInstance()
        .get(`leaderboard/pages?type=${type}`, undefined)
        .then((response) => {
            // response est un int côté backend -> parfois ton wrapper renvoie direct le nombre,
            // parfois { value: number }. On gère les 2.
            if (typeof response === "number") return response;
            if (response?.pages !== undefined) return response.pages;
            return response;
        })
        .catch((error) => {
            APIHelper.treatError(error);
            return 0;
        });
    }

    static async getLeaderboard(type: LeaderboardType, page: number = 1): Promise<UsersLeaderboardEntry[]> {
        return await API.getInstance()
            .get(`leaderboard?type=${type}&page=${page}`, undefined)
            .then((response) => response as UsersLeaderboardEntry[])
            .catch((error) => {
                APIHelper.treatError(error);
                return [];
            });
    }

    static async getMyLeaderboardEntry(type: LeaderboardType): Promise<UsersLeaderboardEntry | undefined> {
        return await API.getInstance()
            .get(`leaderboard/me?type=${type}`, await APIHelper.getCurrentOrCreateNewAccount())
            .then((response) => response as UsersLeaderboardEntry)
            .catch((error) => {
                APIHelper.treatError(error);
                return undefined;
            });
    }

    static treatError(error: ErrorResponse): void {
        if (error.code === 400) {
            console.warn("Account not found");
        }
        if (error.code === 429) {
            console.warn("Too many requests... Please wait a moment");
        }
        if (error.code === 500) {
            console.error("Unexpected internal error... Please try again later");
        }
    }
}