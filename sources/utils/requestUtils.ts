import Constants from 'expo-constants';
import { authFetch } from "./fetch";
const SERVER_DOMAIN = Constants.expoConfig?.extra?.serverApi

const BASE_URL = SERVER_DOMAIN 
    ? `https://${SERVER_DOMAIN}`
    : 'localhost:3000';


export const registerCustomerRequester = async ({ name, email, password, phone }: any) => {
    try {
        const res = await fetch(`${BASE_URL}/customer/register`, {
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
        const res = await fetch(`${BASE_URL}/customer/check-customer?email=${email}&phone=${phone}`, {
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
        const res = await fetch(`${BASE_URL}/customer/verify-otp`, {
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
        const res = await fetch(`${BASE_URL}/customer/resend-otp`, {
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
        const res = await fetch(`${BASE_URL}/customer/login`, {
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
        const res = await authFetch(`${BASE_URL}/customer/profile`, {
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
        const res = await fetch(`${BASE_URL}/customer/forgot-password`, {
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
        const res = await fetch(`${BASE_URL}/customer/resend-reset-otp`, {
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
        const res = await fetch(`${BASE_URL}/customer/verify-reset-otp`, {
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
        const res = await fetch(`${BASE_URL}/customer/reset-password`, {
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
        const res = await authFetch(`${BASE_URL}/products/category`, {
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
        const res = await authFetch(`${BASE_URL}/products/bestSeller`)
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
        const res = await authFetch(`${BASE_URL}/products/productData`)
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
        const res = await authFetch(`${BASE_URL}/products/sizes/${id}`, {
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

        const res = await fetch(`${BASE_URL}/profile/upload-image`, {
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

        const res = await fetch(`${BASE_URL}/profile/edit`, {
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

        const res = await authFetch(`${BASE_URL}/profile/delete`, {
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

        const res = await authFetch(`${BASE_URL}/profile/address`, {
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

export const fetchAddressBySelectedRequester = async (id: any) => {
    try {

        const res = await authFetch(`${BASE_URL}/profile/address/${id}`, {
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
        const res = await authFetch(`${BASE_URL}/profile/create/address`, {
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
        const res = await authFetch(`${BASE_URL}/profile/delete/address/${id}`, {
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

export const updateAddressRequester = async (id: any, payload: any) => {
    try {
        const res = await authFetch(`${BASE_URL}/profile/edit/address/${id}`, {
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

export const addToCartRequester = async (payload: any) => {
    try {
        const res = await authFetch(`${BASE_URL}/cart/`, {
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
        const res = await authFetch(`${BASE_URL}/cart/`, {
            method: "GET",
        })

        // if (!res.ok) {
        //     const text = await res.text().catch(() => '');
        //     throw new Error(`fetch Address failed (${res.status}): ${text}`);
        // }

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


export const deleteCartRequester = async (id: any) => {
    try {
        const res = await authFetch(`${BASE_URL}/cart/delete/${id}`, {
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


export const updateQuantityRequester = async (payload: any) => {
    try {
        const res = await authFetch(`${BASE_URL}/cart/update/quantity`, {
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

export const PaymentRequester = async (payload:any) => {
    try {
        const res = await authFetch(`${BASE_URL}/order/create/payment`, {
            method: "POST",
            body: JSON.stringify(payload)
        })

        const data = await res.json()

        if (!res.ok) {
            const err: any = new Error(data.res_desc || "Something went wrong");
            err.res_code = data.res_code;
            throw err;
        }

        return data.data.response;
    } catch (error) {
        console.error(error)
        throw error;
    }
}

export const createOrderRequester = async () => {
    try {
        const res = await authFetch(`${BASE_URL}/order/create`, {
            method: "POST",
        })

        const data = await res.json()

        console.log("Payment Response: ", data.data.response)
        if (!res.ok) {
            const err: any = new Error(data.res_desc || "Something went wrong");
            err.res_code = data.res_code;
            throw err;
        }

        return data.data.response;
    } catch (error) {
        console.error(error)
        throw error;
    }
}

export const fetchOrderRequester = async (reference:any) => {
    try {
        const res = await authFetch(`${BASE_URL}/order/payment/${reference}`, {
            method: "GET"
        })

        const data = await res.json()

        console.log("Payment Response: ", data.data.response)
        if (!res.ok) {
            const err: any = new Error(data.res_desc || "Something went wrong");
            err.res_code = data.res_code;
            throw err;
        }

        return data.data;
    } catch (error) {
        console.error(error)
        throw error;
    }
}

export const PayForQRRequester = async (payload:any) => {
    try {
        const res = await authFetch(`${BASE_URL}/order/payment/qr`, {
            method: "POST",
            body: JSON.stringify(payload)
        })

        const data = await res.json()
        console.log("Data: ", data)
        if (!res.ok) {
            const err: any = new Error(data.res_desc || "Something went wrong");
            err.res_code = data.res_code;
            throw err;
        }

        return data.data;
    } catch (error) {
        console.error(error)
        throw error;
    }
}

export const fetchOrderHistoryRequester =  async () => {
    try {
        const res = await authFetch(`${BASE_URL}/order/history`, {
            method: "GET",
        })

        const data = await res.json()
        if (!res.ok) {
            const err: any = new Error(data.res_desc || "Something went wrong");
            err.res_code = data.res_code;
            throw err;
        }

        return data.data;
    } catch (error) {
        console.error(error)
        throw error;
    }
}


export const getTrackOrderRequester =  async (orderId?: any) => {
    try {
        const res = await authFetch(`${BASE_URL}/order/trackOrder?orderId=${orderId}`, {
            method: "GET",
        })

        const data = await res.json()
        if (!res.ok) {
            const err: any = new Error(data.res_desc || "Something went wrong");
            err.res_code = data.res_code;
            throw err;
        }

        return data.data;
    } catch (error) {
        console.error(error)
        throw error;
    }
}


export const CancelOrderRequester =  async (payload: any) => {
    try {
        const res = await authFetch(`${BASE_URL}/order/cancel`, {
            method: "POST",
            body: JSON.stringify(payload)
        })

        const data = await res.json()
        if (!res.ok) {
            const err: any = new Error(data.res_desc || "Something went wrong");
            err.res_code = data.res_code;
            throw err;
        }

        return data.data;
    } catch (error) {
        console.error(error)
        throw error;
    }
}

export const fetchNotifyOrderRequester =  async () => {
    try {
        const res = await authFetch(`${BASE_URL}/order/notification`, {
            method: "GET"
        })

        const data = await res.json()
        if (!res.ok) {
            const err: any = new Error(data.res_desc || "Something went wrong");
            err.res_code = data.res_code;
            throw err;
        }

        return data.data;
    } catch (error) {
        console.error(error)
        throw error;
    }
}