"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.characterService = exports.postService = exports.usuarioService = void 0;
const getUsers_1 = require("../logic/getUsers");
exports.usuarioService = new getUsers_1.ApiService("https://jsonplaceholder.typicode.com/users");
exports.postService = new getUsers_1.ApiService("https://jsonplaceholder.typicode.com/posts");
exports.characterService = new getUsers_1.ApiService("https://rickandmortyapi.com/api/character");
