import Constants from 'expo-constants';
import { authFetch } from "./fetch";
const SERVER_API = Constants.expoConfig?.extra?.serverApi



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

export const checkCustomerExistRequester = async ({ email, phone }: any) => {
    try {
        const res = await fetch(`http://${SERVER_API}/customer/check-customer?email=${email}&phone=${phone}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })

        const data = await res.json();

        if (!res.ok) {
            const err: any = new Error(data.res_desc || "Something went wrong");
            err.res_code = data.res_code;
            throw err;
        }

        return data.data

    } catch (error) {
        console.error(error)
        throw error;
    }
}

export const verifyOtpRequester = async ({ email, otp }: any) => {
    try {
        const res = await fetch(`http://${SERVER_API}/customer/verify-otp`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, otp })
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


export const resendOtpRequester = async ({ email }: any) => {
    try {
        const res = await fetch(`http://${SERVER_API}/customer/resend-otp`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
        });

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
};

export const LoginCustomerRequester = async ({ email, password }: any) => {
    try {
        const res = await fetch(`http://${SERVER_API}/customer/login`, {
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

        return data.data
    } catch (error) {
        console.error(error)
        throw error;
    }
}


export const fetchProfileRequester = async () => {
    try {
        const res = await authFetch(`http://${SERVER_API}/customer/profile`, {
            method: 'GET'
        });
        const data = await res.json();

        if (!res.ok) {
            const err: any = new Error(data.res_desc || "Something went wrong");
            err.res_code = data.res_code;
            throw err;
        }

        return data.data
    } catch (error) {
        console.error(error)
        throw error;
    }
}
export const forgotPasswordRequester = async ({ email }: any) => {
    try {
        const res = await fetch(`http://${SERVER_API}/customer/forgot-password`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email })
        })

        const data = await res.json();

        if (!res.ok) {
            const err: any = new Error(data.res_desc || "Something went wrong");
            err.res_code = data.res_code;
            throw err;
        }

        return data.data
    } catch (error) {
        console.error(error)
        throw error;
    }
}


export const resendResetOtpRequester = async ({ email }: any) => {
    try {
        const res = await fetch(`http://${SERVER_API}/customer/resend-reset-otp`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email })
        })

        const data = await res.json();

        if (!res.ok) {
            const err: any = new Error(data.res_desc || "Something went wrong");
            err.res_code = data.res_code;
            throw err;
        }

    } catch (error) {
        console.error(error)
        throw error;
    }
}


export const verifyResetOtpRequester = async ({ email, otp }: any) => {
    try {
        const res = await fetch(`http://${SERVER_API}/customer/verify-reset-otp`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, otp })
        })

        const data = await res.json();

        if (!res.ok) {
            const err: any = new Error(data.res_desc || "Something went wrong");
            err.res_code = data.res_code;
            throw err;
        }

    } catch (error) {
        console.error(error)
        throw error;
    }
}

export const resetPasswordRequester = async ({ email, newPassword }: any) => {
    try {
        const res = await fetch(`http://${SERVER_API}/customer/reset-password`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, newPassword })
        })

        const data = await res.json();

        if (!res.ok) {
            const err: any = new Error(data.res_desc || "Something went wrong");
            err.res_code = data.res_code;
            throw err;
        }

    } catch (error) {
        console.error(error)
        throw error;
    }
}





export const fetchCategoryRequester = async () => {
    try {
        const res = await authFetch(`http://${SERVER_API}/products/category`, {
            method: 'GET'
        });

        const data = await res.json();

        if (!res.ok) {
            const err: any = new Error(data.res_desc || "Something went wrong");
            err.res_code = data.res_code;
            throw err;
        }

        return data.data
    } catch (error) {
        console.error(error)
        throw error;
    }
}

export const fetchBestSellerRequester = async () => {
    try {
        const res = await authFetch(`http://${SERVER_API}/products/bestSeller`)
        const data = await res.json()
        if (!res.ok) {
            const err: any = new Error(data.res_desc || "Something went wrong");
            err.res_code = data.res_code;
            throw err;
        }

        return data.data
    } catch (error) {
        console.error(error)
        throw error;
    }
}



export const fetchProductDataRequester = async () => {
    try {
        const res = await authFetch(`http://${SERVER_API}/products/productData`)
        const data = await res.json()
        if (!res.ok) {
            const err: any = new Error(data.res_desc || "Something went wrong");
            err.res_code = data.res_code;
            throw err;
        }

        return data.data
    } catch (error) {
        console.error(error)
        throw error;
    }
}


export const fetchProductSizeRequester = async (id: any) => {
    try {
        const res = await authFetch(`http://${SERVER_API}/products/sizes/${id}`,{
            method: "GET",
        })
        const data = await res.json()
        if (!res.ok) {
            const err: any = new Error(data.res_desc || "Something went wrong");
            err.res_code = data.res_code;
            throw err;
        }

        return data.data
    } catch (error) {
        console.error(error)
        throw error;
    }
}

export const uploadProfileImageRequester = async (params: { userId: number; uri: string }) => {
    const { userId, uri } = params;
    try {
        const ext = uri.split('.').pop()?.toLowerCase();
        const mime = ext === 'png' ? 'image/png' : ext === 'jpg' || ext === 'jpeg' ? 'image/jpeg' : 'image/*';

        const form = new FormData();
        form.append('userId', String(userId));
        form.append('profile_img', {
            uri,
            type: mime,
            name: `profile_${userId}.${ext || 'jpg'}`
        } as any)

        const res = await fetch(`http://${SERVER_API}/profile/upload-image`, {
            method: "POST",
            body: form,
        })

        if (!res.ok) {
            const text = await res.text().catch(() => '');
            throw new Error(`Upload failed (${res.status}): ${text}`);
        }

        const data = await res.json()
        return data;
    } catch (error) {
        console.error(error)
        throw error;
    }
}



export const updateProfileRequester = async (payload: any) => {
    try {

        const res = await fetch(`http://${SERVER_API}/profile/edit`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        })


         if (!res.ok) {
            const text = await res.text().catch(() => '');
            throw new Error(`Update failed (${res.status}): ${text}`);
        }

        const data = await res.json()
        return data;

    } catch (error) {
        console.error(error)
        throw error;
    }

}

export const deleteProfileRequester = async () => {
    try {

        const res = await authFetch(`http://${SERVER_API}/profile/delete`, {
            method: "DELETE",
        })

         if (!res.ok) {
            const text = await res.text().catch(() => '');
            throw new Error(`delete failed (${res.status}): ${text}`);
        }

        const data = await res.json()
        return data;

    } catch (error) {
        console.error(error)
        throw error;
    }

}

export const fetchAddressRequester = async () => {
    try {

        const res = await authFetch(`http://${SERVER_API}/profile/address`, {
            method: "GET",
        })


         if (!res.ok) {
            const text = await res.text().catch(() => '');
            throw new Error(`fetch Address failed (${res.status}): ${text}`);
        }

        const data = await res.json()
        return data;

    } catch (error) {
        console.error(error)
        throw error;
    }

}

export const createAddressRequester = async (payload: any) => {
    try {
        const res = await authFetch(`http://${SERVER_API}/profile/create/address`, {
            method: "POST",
            body: JSON.stringify(payload)
        })
         if (!res.ok) {
            const text = await res.text().catch(() => '');
            throw new Error(`fetch Address failed (${res.status}): ${text}`);
        }

        const data = await res.json()
        return data;
    } catch (error) {
        console.error(error)
        throw error;
    }
}


export const deleteAddressRequester = async (id: any) => {
    try {
        const res = await authFetch(`http://${SERVER_API}/profile/delete/address/${id}`, {
            method: "DELETE",
        })

         if (!res.ok) {
            const text = await res.text().catch(() => '');
            throw new Error(`fetch Address failed (${res.status}): ${text}`);
        }

        const data = await res.json()
        return data;
    } catch (error) {
        console.error(error)
        throw error;
    }
}

export const updateAddressRequester = async (id:any, payload:any) => {
     try {
        const res = await authFetch(`http://${SERVER_API}/profile/edit/address/${id}`, {
            method: "PUT",
            body: JSON.stringify(payload)
        })

         if (!res.ok) {
            const text = await res.text().catch(() => '');
            throw new Error(`fetch Address failed (${res.status}): ${text}`);
        }

        const data = await res.json()
        return data;
    } catch (error) {
        console.error(error)
        throw error;
    }
}

export const addToCartRequester = async (payload:any) => {
     try {
        const res = await authFetch(`http://${SERVER_API}/cart/`, {
            method: "POST",
            body: JSON.stringify(payload)
        })
        const data = await res.json()

         if (!res.ok) {
            const err: any = new Error(data.res_desc || "Something went wrong");
            err.res_code = data.res_code;
            throw err;
        }

        return data;
    } catch (error) {
        console.error(error)
        throw error;
    }
}

export const fetchCartRequester = async () => {
     try {
        const res = await authFetch(`http://${SERVER_API}/cart/`, {
            method: "GET",
        })

         if (!res.ok) {
            const text = await res.text().catch(() => '');
            throw new Error(`fetch Address failed (${res.status}): ${text}`);
        }

        const data = await res.json()
        return data;
    } catch (error) {
        console.error(error)
        throw error;
    }
}


export const deleteCartRequester = async (id: any) => {
     try {
        const res = await authFetch(`http://${SERVER_API}/cart/delete/${id}`, {
            method: "DELETE",
        })

         if (!res.ok) {
            const text = await res.text().catch(() => '');
            throw new Error(`fetch Address failed (${res.status}): ${text}`);
        }

        const data = await res.json()
        return data;
    } catch (error) {
        console.error(error)
        throw error;
    }
}


export const updateQuantityRequester = async (payload:any) => {
     try {
        const res = await authFetch(`http://${SERVER_API}/cart/update/quantity`, {
            method: "PATCH",
            body: JSON.stringify(payload)
        })
        const data = await res.json()

         if (!res.ok) {
            const err: any = new Error(data.res_desc || "Something went wrong");
            err.res_code = data.res_code;
            throw err;
        }

        return data;
    } catch (error) {
        console.error(error)
        throw error;
    }
}