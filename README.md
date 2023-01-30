## API를 이용한 뉴스 뷰어

### React

---

#### NewsItem.js

뉴스항목 컴포넌트<br>
api로 가져온 데이터 props로 title, description, url, urlToImage 를 가져와<br>
각 태그에 넣어줍니다.

    const NewsItem = ({ article }) => {
      const { title, description, url, urlToImage } = article;
      {urlToImage && (
        <div className="thumbnail">
          <a href={url} target="_blank" rel="noopener noreferrer">
            <img src={urlToImage} alt="thumbnail" />
          </a>
        </div>
      )}
      <div className="contents">
        <h2>
          <a href={url} target="_blank" rel="noopener noreferrer">
            {title}
          </a>
        </h2>
        <p>{description}</p>
      </div>

---

#### NewsList.js

axios를 이용하여 api를 호출하고 각 데이터에 map메소드를 통해 item컴포넌트로 사용합니다.<br>
useState를 활용해 데이터를 가져오는중엔 loading=false,true로 변환하여 각각 다른 데이터를 표시합니다.<br>

    //이후에 만든 카테고리컴포넌트에서 category를 props로 받아온다.
    const NewsList = ({ category }) => {
    const [articles, setArticles] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      const fetchData = async () => {
        setLoading(true);
      try {
          const query = category === "all" ? "" : `&category=${category}`;
          //all이면 카테고리 설정하지않는다.
          const response = await axios.get(
            `https://newsapi.org/v2/top-headlines?country=kr${query}&apiKey=41efe5f669734fa4b19743f6a8676176`
          );
          //api호출
          setArticles(response.data.articles);
          //articles에 데이터
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

---

### Categories.js

가져온api에 6개의 카테고리가 있습니다.<br>
가져온 카테고리를 배열로 만들어 화면에보여지는 text, api주소에 적용될 카테고리는name으로 설정<br>

    const categories = [
    {
    name: "all",
    text: "전체보기",
    },
    {
    name: "business",
    text: "비즈니스",
    },
    {
    name: "entertainment",
    text: "엔터테이먼트",
    },
    {
    name: "health",
    text: "건강",
    },
    {
    name: "science",
    text: "과학",
    },
    {
    name: "sports",
    text: "스포츠",
    },
    {
    name: "technology",
    text: "기술",
    },
    ];

    이후 만든 배열에 map함수를 적용하여 각 카테고리를 생성한다.

    const Categories = ({ category, onSelect }) => {
      return (
      <CategoriesBlock>
        {categories.map((c) => (
          <Category
            key={c.name}
            active={category === c.name}
            onClick={() => onSelect(c.name)}
            >
            {c.text}
          </Category>
            //map메소드로 각 카테고리들을 생성한다.
          ))}
      </CategoriesBlock>
      );
      };

category에 key에는 고유한 값이 들어가야하기 때문에 name을 사용한다.

---
