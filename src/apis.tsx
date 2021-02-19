import axios, { AxiosResponse } from 'axios';

/**
 * This file holds all the apis.
 */

export const SEND_INVITE_URL = 'https://l94wc2001h.execute-api.ap-southeast-2.amazonaws.com/prod/fake-auth';

export function sendInviteApi(name: string, email: string): Promise<AxiosResponse> {
    return axios({
        method: 'post',
        url: SEND_INVITE_URL,
        data: {
            name,
            email
        },
        timeout: 10000
    });
}