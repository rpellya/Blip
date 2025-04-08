import { Fetch } from 'utils/Fetch';
import { authEndPoint, getEndPoint } from 'utils/getEndPoint';

export class ProfileService {
    protected readonly requestService = new Fetch();

    public async GetUser() {
        const data = await this.requestService.get(
            getEndPoint(authEndPoint, 'user'),
            { method: 'GET', timeout: 0 },
        );

        return data;
    }

    public async LogOut() {
        const { status } = await this.requestService.post(
            getEndPoint(authEndPoint, 'logout'),
            { method: 'POST', timeout: 0 },
        );

        return status;
    }
}
