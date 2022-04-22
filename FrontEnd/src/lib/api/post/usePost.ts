import { getPosts } from './getPosts';

export function usePost(index: number) {
    
    const posts: any = getPosts();    
    const post = posts[index]
    return post        
}