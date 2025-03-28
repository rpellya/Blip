import { FormType } from 'entities/Profile';
import { Fetch } from 'utils/Fetch';
import { API_URL, authEndPoint, getEndPoint } from 'utils/getEndPoint';

export class ProfileEditInfoService {
    protected readonly requestService = new Fetch();

    public async GetUser() {
        const data = await this.requestService.get(
            getEndPoint(authEndPoint, 'user'),
            { method: 'GET', timeout: 0 },
        );

        return data;
    }

    public async PutUser(formType: FormType, formData: Record<string, string>) {
        const { status } = await this.requestService.put(
            getEndPoint(API_URL, 'user', formType),
            {
                data: JSON.stringify(formData),
                method: 'PUT',
                timeout: 0,
                headers: {
                    'Content-Type': 'application/json',
                },
            },
        );

        return status;
    }
}
