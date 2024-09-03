"use client"

import { signIn, SignInResponse } from "next-auth/react";


export async function doCredentialLogin(formData: FormData): Promise<SignInResponse | undefined> {
    console.log("formData", formData.get("email"));
  
    try {
      const response = await signIn("credentials", {
        email: formData.get("email"),
        password: formData.get("password"),
        redirect: false,
      });
      console.log("ok c bon")
      return response;
    } catch (err) {
      throw err;
    }
  }