<div style="display: flex; align-items: center;">
  <img src="https://images.emojiterra.com/twitter/v13.1/512px/1f1ea-1f1fa.png" alt="Drapeau de l'Europe" width="50" style="margin-top: 30px;margin-right:10px"> <h1>Euroguessr: Project setup with Docker</h1>
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

# 🚀 Start the project

```bash
cd {YOURCODEFOLDER}/Euroguessr
sudo docker-compose -f docker-compose.local.yaml up
```

# 🌐 Access the project

The project can be accessed at the following URLs:

- https://localhost:80/
- https://127.0.0.1:80/
  OR
- http://localhost:80/
- http://127.0.0.1:80/

If you want to bind other ports to the project, you can change the `docker-compose.local.yaml` file
and edit in the euroguessr service the ports section like this:

```yml
ports:
  - "THE PORT YOU WANT TO BE BIND:$EUROGUESSR_PORT"
```

The project can be accessed at the following URLs:

- https://localhost:PORT/
- https://127.0.0.1:PORT/
  OR
- http://localhost:PORT/
- http://127.0.0.1:PORT/

# 🛑 Stop the project

```bash
cd {YOURCODEFOLDER}/Euroguessr
sudo docker-compose -f docker-compose.local.yaml down
```
