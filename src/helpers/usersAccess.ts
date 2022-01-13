// connections to database
import PostgresClient from "../loaders/providers/PostgresClient";
import { UsersStore } from "./types";

export default class UsersStoreAccess implements UsersStore {
    signIn(): string {
        throw new Error("Method not implemented.");
    }

}