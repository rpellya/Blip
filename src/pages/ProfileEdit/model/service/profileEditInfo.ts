import { FormType } from 'entities/Profile';
import { Fetch } from 'utils/Fetch';
import { authEndPoint, getEndPoint, userEndPoint } from 'utils/getEndPoint';

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
            getEndPoint(userEndPoint, formType),
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
    public async UploadAvatar(file: File) {
        try {
            const formData = new FormData();
            formData.append('avatar', file);

            const data = await this.requestService.put(
                getEndPoint(userEndPoint, 'profile', 'avatar'),
                {
                    data: formData,
                    method: 'PUT',
                    timeout: 0,
                },
            );

            return data;
        } catch (e) {
            console.log(e);
        }
    }
}
