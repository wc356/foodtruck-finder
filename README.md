# Foodtruck Finder

A Node.js based CLI program that fetches currently open food trucks data in JSON format through [Socrata Open Data API](https://dev.socrata.com/).

## Dependencies

- axios v0.20.0
- Socrata Open Data API
- node.js & npm

## Build the Program

1. Please check to see if your device has node and npm installed. If not, install the latest version of node and npm [here](https://nodejs.org/en/download/).

2. Open the command line. Change working directory to the root project folder-'Redfin Work Sample'-and execute:

```zsh
% npm install
```

This will install all the dependencies listed in `package.json` file.

3. Next, execute the following in the command line:

```zsh
% npm i -g .
```

This will install the package globally in the CLI, and the program is ready to run on your device.

## Run the Program

To run the program, please execute the following from the command line:

```zsh
% foodtrucks
```

Or alternatively, run:

```zsh
% node .
```

![GIF of program running in CLI](/images/food-truck-finder.gif)

Upon running the command, you will be presented with a list of 10 open foodtrucks in San Francisco at the time of script execution. Then, you will be prompted to enter from a list of possible entries—'n' next, 'b' back, 'q' quit.

_For heavy data requests and use of this program, please register with Socrata Open Data API to obtain your application token; there are no set throttling limits set to data requests for programs running with application tokens._

## Potential Modifications for Scaling

Adaptation of this simple CLI program into a fully fledged web application for millions of users, would require the need for scalable solutions.

### Features

- As users grow into the millions, there needs to be new features for end users outside of San Francisco.
  - Currently the program only fetches information of open food trucks in San Francisco, and does not take into account the time zone difference of the user and San Francisco’s.

### Code

- As for software architecture, I would utilize microservices to set up any services to be deployed and updated independently. This would allow for easier integration of additional technologies or frameworks as each services are maintained separately. Unit tests and error handling would exist for every module.

- For type checking, TypeScript would serve as a great candidate as a scalable solution. It lessens the risk of scaling with a language as highly mutable as JavaScript.

- As for performance optimization, adding in caching methods would allow for less requests sent out to the server, and registering application tokens would remove the throttling cap for requests to the API.

- A styles documentation would come in handy for the multiple developers working on the project, for easier maintenance, better readable code, and unified codebase.

### Client

- I would utilize React to create a PWA. Reusable components made in React would allow for better maintainability while scaling, and its use of virtual DOM would prove to be effective in re-rendering only necessary components.

- Building a progressive web application would allow for one to enjoy the services offline, installable, notifications, and utilize client-side storage.

### Database

- In the mere chance that such a databases are needed, I would look into scalable database services such as Amazon RDS for automatic scaling. A read-heavy database with read replicas would help offload tasks and sharding data into distributed servers could prevent a complete shut down of services in events of outages by having multiple backups stored in servers.
