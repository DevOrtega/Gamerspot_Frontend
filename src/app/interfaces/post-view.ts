import { Tag } from './tag';

export interface PostView {
    _id: string,
    username: string,
    name: string,
    role: string,
    text: string,
    photoUrl: string,
    tags?: Tag[],
    createdAt: string
}
