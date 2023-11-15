<div style="display: flex; align-items: center;">
  <img src="https://images.emojiterra.com/twitter/v13.1/512px/1f1ea-1f1fa.png" alt="Drapeau de l'Europe" width="50" style="margin-top: 30px;margin-right:10px"> <h1>Euroguessr: Project setup</h1>
</div>

![Version 0.1](https://img.shields.io/badge/Version-0.1-green)
![Logo .NET](https://img.shields.io/badge/-.NET%206.0-blueviolet)
[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

⚠️ **This guide is only for Unix users**

# 🐳 Docker

## Ubuntu

### Install Docker

```bash
sudo apt-get update
sudo apt-get install docker
```

### Install Docker Compose

```bash
sudo apt-get update
sudo apt-get install docker-compose
```

## Arch Linux

### Install Docker

```bash
sudo pacman -Syu
sudo pacman -S docker
```

### Install Docker Compose

```bash
sudo pacman -Syu
sudo pacman -S docker-compose
```

# ⚡ Git

## Ubuntu

### Install Git

```bash
sudo apt-get update
sudo apt-get install git
```

## Arch Linux

### Install Git

```bash
sudo pacman -Syu
sudo pacman -S git
```

# 📦 .NET 6.0

## Ubuntu

```bash
sudo apt-get update
sudo apt-get install dotnet-runtime-6.0 dotnet-sdk-6.0 aspnetcore-runtime-6.0
```

## Arch Linux

```bash
sudo pacman -Syu
sudo pacman -S dotnet-runtime-6.0 dotnet-sdk-6.0 aspnet-runtime-6.0
```

# 🔨 Setup

## Clone the repository

```bash
git clone https://github.com/EuroguessrTeam/Euroguessr.git
```

## Setup the environment variables

```bash
cd {YOURCODEFOLDER}/Euroguessr
cp .env.example .env

cd {YOURCODEFOLDER}/Euroguessr/Euroguessr
cp appsettings.docker.example.json appsettings.json
```

On the file `appsettings.json`, delete the 3 first lines

# 🐘 PostgreSQL

Change the `appsettings.json` file with the following values:

```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "ConnectionStrings": {
    "DatabaseConnection": "Server=localhost;Port=5432;Database=euroguessr;Username=postgres;Password=root"
  },
  "AllowedHosts": "*"
}
```

# 🚀 Start the project

Launch the following command to start the database:

```bash
cd {YOURCODEFOLDER}/Euroguessr
docker-compose up -d db

cd {YOURCODEFOLDER}/Euroguessr/Euroguessr
dotnet watch
```

# 🌐 Access the project

The project can be accessed at the following URLs:

- http://localhost:7079/
- http://127.0.0.1:7079/

# 🛑 Stop the project

```bash
cd {YOURCODEFOLDER}/Euroguessr
docker-compose down db
```

And quit the `dotnet watch` command with `Ctrl + C`
