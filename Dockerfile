FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["Euroguessr/Euroguessr.csproj", "Euroguessr/"]
RUN dotnet restore "Euroguessr/Euroguessr.csproj"
COPY . .
WORKDIR "/src/Euroguessr"
RUN cat "Euroguessr.csproj"
RUN dotnet build "Euroguessr.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Euroguessr.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Euroguessr.dll"]
EXPOSE 7079