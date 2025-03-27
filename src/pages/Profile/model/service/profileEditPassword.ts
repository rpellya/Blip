import { FormType } from 'entities/Profile';
import { Fetch } from 'utils/Fetch';
import { API_URL, getEndPoint } from 'utils/getEndPoint';

export class EditPasswordService {
    protected readonly requestService = new Fetch();

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
