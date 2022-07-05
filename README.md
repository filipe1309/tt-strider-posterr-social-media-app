
# <p align="center">Posterr - Social Media App with Clean Arch - Backend - Filipe Leuch Bonfim</p>

<p align="center">
    <img src="https://img.shields.io/badge/Code-NestJS-informational?style=flat-square&logo=nestjs&color=E0234E&logoColor=E0234E" alt="NestJS" />
    <img src="https://img.shields.io/badge/Tools-Docker-informational?style=flat-square&logo=docker&color=2496ED" alt="Docker" />
    <img src="https://img.shields.io/badge/Code-JavaScript-informational?style=flat-square&logo=javascript&color=F7DF1E" alt="JavaScript" />
    <img src="https://img.shields.io/badge/Code-NodeJS-informational?style=flat-square&logo=node.js&color=339933" alt="NodeJS" />
</p>

# Phase 1 - Coding
## 💬 About

This is a twitter like API. 

## :computer: Technologies

- [Node.js](https://nodejs.org/en/)
- [Nest.js](https://nodejs.org/en/)
- [Jest.js](https://nodejs.org/en/)
- [TypeORM.js](https://nodejs.org/en/)
- [Swagger](https://nodejs.org/en/)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

## :scroll: Requirements

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

## :cd: Installation

Up app container:
```sh
make up
```

Run migrations:
```sh
make migrate-up
```

## :runner: Running

```sh
make up
```
> Access the API: http://localhost:3000  

> Access the docs(swagger): http://localhost:3000/api/  

> Access the DB: http://localhost:16543/browser/  

## Endpoints

### Users
- Get Users
- Get User By Id
- Follow user
- Unfollow user

### Posts
- Create Post
- Create Repost
- Create Quote
- Get Posts default (skip = 0, amount = 10)
  - Get Posts with filters (skip, amount)
- Get Post By Post Id
- Get Post By User Id
  - Get Post By User Id with filters (skip, amount)
- Get Posts of Followeds By Follower Id

See `api.http` file.

 ## :white_check_mark: Tests

After up the container:

```sh
make tests
```


# Phase 2 - Planning

## Planning

### Questions
1. Why not show in the main feed?
2. Will there be a limit of replys?
3. Will there be a reply of reply?
4. What is the maximum size of the reply text?
5. Will the owner of the post be notified if there is a reply?
6. Who will be able to see replies?
7. Will the reply be editable?
8. What will happen to the reply if a post is removed?
9. Is it possible to search by reply?
10. Will the secondary feed be sorted by the most recent reply?

### Solution

First I would meet with my team to start an outline of the technical solution and solve doubts about the business rules.

After one, or a few meetings, and after we have confidence in our solution, a reply_to_post table will be created, referencing the post, and containing the reply message.

For the front, the ideal would be to reuse a big part of the code that already exists in the current feed to create the new "Posts and Replies" feed.

The API will need to support this new type of message, I believe it will be something similar to the quote type post, so there may be code reuse in this part.

# Phase 3 - Critique
## Critique

In this project I used a folder structure based on Uncle Bob's "Clean Archtecture", aiming at the future of this project, making it easier to scale and, if necessary, divide the project into microservices.

But there was still a need to improve the test suite, complementing the existing unit tests and adding integration and feature tests.

### Resources

- https://docs.nestjs.com/fundamentals/testing#unit-testing
- https://docs.nestjs.com/openapi/introduction
- https://medium.com/@jonathan.pretre91/clean-architecture-with-nestjs-e089cef65045
- https://docs.nestjs.com/techniques/validation
- https://docs.nestjs.com/techniques/database#migrations
- https://docs.nestjs.com/fundamentals/dynamic-modules
- https://www.postgresql.org/docs/current/datatype-enum.html

## License

[MIT](https://choosealicense.com/licenses/mit/)

## About Me

<p align="center">
    <a style="font-weight: bold" href="https://github.com/filipe1309/">
    <img style="border-radius:50%" width="100px; "src="https://github.com/filipe1309.png"/>
    </a>
</p>

---

<p align="center">
    Done with&nbsp;&nbsp;:heart:&nbsp;&nbsp;by <a style="font-weight: bold" href="https://github.com/filipe1309/">Filipe Leuch Bonfim</a> 🖖
</p>

---

