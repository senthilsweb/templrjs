# TemplrJS

## Introduction:
TemplrJS is a comprehensive web application development framework designed for swift deployment. Ideally suited for edge computing scenarios, it harnesses the power of Vue.js, Nuxt.js, Tailwind CSS, and DuckDB to provide developers with an efficient and streamlined experience.


## Key Features:  

- **Unified Binary**: The entire application is packaged inside a singular Go-based binary, ensuring seamless execution.
  
- **Embedded Database Support**: Comes integrated with DuckDB. It defaults to an in-memory database, offering flexibility in using an existing database file or creating a new one based on configurations.
  
- **Client-Only NuxtJS Design**: The default web application follows a client-only NuxtJS architecture, eliminating the need for server-side rendering (SSR).
  
- **Optimized for All Devices**: Tailored for both mobile and web platforms, every page is designed with a mobile-first approach, guaranteeing optimal mobile responsiveness.

## Development Setup

### Prerequisites

- Go: https://golang.org/doc/install
- Node.js: https://nodejs.org/en/download/
- Npm: https://docs.npmjs.com/downloading-and-installing-node-js-and-npm

### Installation

1. Clone the repository: `git clone https://github.com/username/project.git`
2. Navigate to the project directory: `cd project`
3. Install Go dependencies: `go mod download`
4. Install Node.js dependencies: `yarn install`
6. Create a copy of `.env.sample` and name it `.env`: `cp .env.sample .env`
7. Open the `.env` file in a text editor and set the `API_BASE_URL` variable to `http://localhost:<port>` where `<port>` is the port number that the Go server will run on.

### Development

1. Open a terminal and navigate to the root directory of the project.
2. Run `go run .` to start the Go server.
3. Once the Go server is running, open another terminal and navigate to the `/web` directory of the project.
4. Run `npm run dev` to start the development server for the web project.
5. Open a web browser and navigate to `http://localhost:3000` to view the web application.

## Production Setup

### Prerequisites

- Go: https://golang.org/doc/install
- Node.js: https://nodejs.org/en/download/
- Npm: https://docs.npmjs.com/downloading-and-installing-node-js-and-npm

### Building & Installation

1. Clone the repository: `git clone https://github.com/username/project.git`
2. Navigate to the project directory: `cd project`
3. Install Go dependencies: `go mod download`
4. Navigate to the web directory: `cd web` and Install Node.js dependencies: `npm i`
5. Create a copy of `.env.sample` and name it `.env`: `cp .env.sample .env`
6. Open the `.env` file in a text editor and set the `API_BASE_URL` variable to empty.
7. Run `npm run generate` to build the web project.
8. Navigate to the root directory of the project and run `sh move_dist.sh` to move the generated static files to the appropriate location.
9. Run `go build -o templrjs -v .` to build the Go binary.

### Deployment

1. Copy the following files to the production linux server:
    - Go binary `templrjs`
    - `templrjs.duckdb` (if you are using duckdb)   
    - `templrjs.duckdb.wal` (if you are using duckdb)
    - `config.yml`
    - `docker-compose.yml` (if you are using Traefik for reverse proxy)
    - `rules.yml` (if you are using Traefik for reverse proxy)
2. Run the Go binary to start the production server. `./templrjs -p 8080`
3. If you are using Traefik for reverse proxy, 
    - Create `letsencrypt` folder in the root where the binary is kept
    - Make sure the go server `templrjs` is running on port `8080`
    - Run `docker-compose up -d` to start the Traefik container.
