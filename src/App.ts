import { usuarioService } from "./service/ApiService";
import { postService } from "./service/ApiService";
import { characterService } from "./service/ApiService";

async function pruebas() {

  // GET ALL USERS
    const users = await usuarioService.getAll();

    console.log("GET ALL USERS:");
    if (users.error) {
        console.error(users.error);
    } else {
        console.log(users.data);
        console.log("Es array", Array.isArray(users.data)); 
    }
  // GET ONE USER
    const user = await usuarioService.getOne(1);

    console.log("\nGET ONE USER:");
    if (user.error) {
        console.error(user.error);
    } else {
        console.log(user.data);
    }

  //  ERROR (ID inválido)
    const userError = await usuarioService.getOne(99999);
    console.log("GET ONE INVALID USER:");
    if (userError.error) {
        console.error("Error controlado:", userError.error);
    } else {
        console.log(userError.data);
    }


  // GET ALL POSTS

    const posts = await postService.getAll();

    console.log("GET ALL POSTS:");
    if (posts.error) {
        console.error(posts.error);
    } else {
        console.log(posts.data?.slice(0, 2));
    }


  // RICK & MORTY
    const characters = await characterService.getAll();

    console.log("GET CHARACTERS:");
    if (characters.error) {
        console.error(characters.error);
    } else {
        console.log(characters.data?.results.slice(0, 2));
    }
}

pruebas();