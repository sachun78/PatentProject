import { IComment } from 'lib/api/types';

export default function DummyPost() {    
    // 임시데이터
    const commentsArray: IComment[] = [];
    for(let i = 0; i <= 4; i++) {
        commentsArray.push({
            id: String(i),
            text: `테스트코멘트${i}`,
            writer: `코멘트글쓴이${i}`,    
        })
    }

    const arrays: any = [];
    for(let i = 0; i <= 5; i++) {
        arrays.push({       
            id: String(i),     
            text: `<테스트${i}> 앱 개발자, 데이터 사이언티스트, 엔지니어를 위한 2022년 최신 AI/ML 무료 교육에 초대합니다! 한국어 자연어 처리를 고민하고 계신가요? 수요 예측을 위한 시계열 예측 모델이 필요하신가요? AWS가 제공하는 다양한 기능을 이용해 보다 쉽고 빠르게 머신러닝 모델을 업무에 적용하는 방법을 배워보세요!`,
            like: 5,
            comments: commentsArray,
            title: `title ${i}`,
            writer: `글쓴이 ${i}`,
            created_at: new Date()
        })
    }

    return arrays;
    
}