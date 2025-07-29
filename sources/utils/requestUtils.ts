const SERVER_API = '192.168.100.16:9302'

export const registerCustomerRequester = async ({ name, email, password, phone }: any) => {
    try {
        const res = await fetch(`http://${SERVER_API}/customer/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, email, password, phone }),
        })

        const json = await res.json();

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
        const res = await fetch(`http://${SERVER_API}/customer/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password })
        })

        const data = await res.json();

        console.log("Data: ",data)
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