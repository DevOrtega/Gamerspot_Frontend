import { Post} from './post';

export interface Tag {
  name: string,
  posts?: Post[]
}
