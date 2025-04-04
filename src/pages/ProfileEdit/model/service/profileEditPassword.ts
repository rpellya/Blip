import { FormType } from 'entities/Profile';
import { Fetch } from 'utils/Fetch';
import { getEndPoint, userEndPoint } from 'utils/getEndPoint';

export class ProfileEditPasswordService {
    protected readonly requestService = new Fetch();

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
}
