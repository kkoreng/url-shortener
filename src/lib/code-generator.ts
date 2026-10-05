import { randomInt } from "node:crypto";

const CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"

export function generateShortCode(): string {
    let code = "";

    for (let i=0; i<6; i++) {
        const index = randomInt(CHARACTERS.length);
        code += CHARACTERS[index];
    }

    return code;
}