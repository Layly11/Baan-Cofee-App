import { saveAuthData } from "./auth";

export const registerCustomerRequester = async ({ name, email, password, phone }: any) => {
    try {
        const res = await fetch("http://127.0.0.1:9302/customer/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, email, password, phone }),
        })

        const json = await res.json();
        console.log("JSON: ", json)

        if (!res.ok) {
            const err: any = new Error(json.res_desc || "Something went wrong");
            err.res_code = json.res_code;
            throw err;
        }


    } catch (error) {
        console.error(error)
        throw error;
    }
}

export const LoginCustomerRequester = async ({ email, password }:any) => {
    try {
        const res = await fetch("http://127.0.0.1:9302/customer/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password })
        })

        const data = await res.json();

        if (!res.ok) {
            const err: any = new Error(data.res_desc || "Something went wrong");
            err.res_code = data.res_code;
            throw err;
        }
        console.log('Data: ', data.data)

        return data.data
    } catch (error){
        console.error(error)
        throw error;
    }
}