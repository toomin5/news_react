//api요청 데이터있는 배열 컴포넌트 배열로 렌더링
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import NewsItem from "./NewsItem";
import axios from "axios";

const NewsListBlock = styled.div`
  box-sizing: border-box;
  padding-bottom: 3rem;
  width: 768px;
  margin: 0 auto;
  margin-top: 2rem;
  @media screen and (max-width: 768px) {
    width: 100%;
    padding-left: 1rem;
    padding-right: 1rem;
  }
`;

const NewsList = ({ category }) => {
  const [articles, setArticles] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const query = category === "all" ? "" : `&category=${category}`;
        const response = await axios.get(
          `https://newsapi.org/v2/top-headlines?country=kr${query}&apiKey=41efe5f669734fa4b19743f6a8676176`
        );
        setArticles(response.data.articles);
      } catch (e) {
        console.log(e);
      }
      setLoading(false);
    };
    fetchData();
  }, [category]);

  //대기중
  if (loading) {
    return <NewsListBlock>로딩중..</NewsListBlock>;
  }
  if (!articles) {
    return null;
  }
  return (
    <NewsListBlock>
      {articles.map((article) => (
        <NewsItem key={article.url} article={article} />
      ))}
    </NewsListBlock>
  );
};

export default NewsList;

// useEffect에 등록하는 함수에 async를 붙이면 안 된다는 것입니다.
// useEffect에서 반환해야 하는 값은 뒷정리 함수이기 때문입니다.
//  따라서 useEffect 내부에서 async/await를 사용하고 싶다면,
//  함수 내부에 async 키워드가 붙은 또 다른 함수를 만들어서 사용해 주어야 합니다.
