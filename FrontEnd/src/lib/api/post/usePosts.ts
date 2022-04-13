import { useQueryClient } from 'react-query';
import { IPost } from '../types';

export function usePosts() {
    const qc = useQueryClient();
    const posts = qc.getQueryData('posts') as IPost[];
    return posts        
}