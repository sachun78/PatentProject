import { useQueryClient } from 'react-query';
import { IPost } from '../types';
import { usePosts } from './usePosts';

export function usePost(index: number) {
    const qc = useQueryClient();
    const posts = usePosts();    
    const post = posts[index]
    return post        
}