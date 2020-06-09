import React from 'react';
import styled from '@emotion/styled';
import { PageContext } from '../../templates/post';
import PostCard from '../PostCard';
import Arrow from '../icons/arrow';

const PostFeedContainer = styled.div`
  align-content: center;
  padding: 60px 30px;

  .getMore_container {
    max-width: 300px;
    margin-left: 70px;
    max-width: 300px;
    margin-left: 70px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    max-height: 410px;
  }

  .getMore_title {
    font-family: Saira;
    text-align: right;
    color: black;
    @media (max-width: 1440px) {
      text-align: center;
    }
  }

  .getMore_link {
    align-self: flex-end;
    font-size: 30px;
    line-height: 44px;
    color: #474747;
    font-weight: bold;
  }

  .arrow {
    display: inline-block;
    margin-left: 30px;
    height: 45px;
    /* background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='%23333' stroke-width='1' stroke-dasharray='5' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e"); */
  }

  @media (max-width: 900px) {
    .getMore_container {
      display: none;
    }

    .getMore_link {
      position: absolute;
      right: 70px;
      font-size: 20px;
      line-height: 30px;
      font-weight: bold;
    }

    .arrow {
      display: inline-block;
      margin-left: 20px;
      height: 40px;
      /* background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='%23333' stroke-width='1' stroke-dasharray='5' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e"); */
    }
  }
`;

const PostsContainer = styled.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 20px;
`;

const PostFeedTitle = styled.div`
  max-width: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
  display: none;
  @media (max-width: 900px) {
    display: flex;
  }
`;

const PostFeedLink = styled.div`
  display: none;
  @media (max-width: 900px) {
    display: flex;
  }
`;

export interface PostFeedProps {
  posts: {
    edges: {
      node: PageContext;
    }[];
  };
}

const PostFeed: React.FunctionComponent<PostFeedProps> = ({ posts }) => {
  return (
    <PostFeedContainer>
      <PostFeedTitle>
        <h1 className="getMore_title">Get more out of Xanthous</h1>
      </PostFeedTitle>
      <PostsContainer>
        {posts.edges.slice(0, 3).map(post => {
          return <PostCard key={post.node.fields.slug} post={post.node} />;
        })}
        <div className="getMore_container">
          <h1 className="getMore_title">Get more out of Xanthous</h1>
          <a href="/blog" className="getMore_link">
            LEARN MORE
            <div className="arrow">
              <Arrow />
            </div>
          </a>
        </div>
      </PostsContainer>
      <PostFeedLink>
        <a href="/blog" className="getMore_link">
          LEARN MORE
          <div className="arrow">
            <Arrow />
          </div>
        </a>
      </PostFeedLink>
    </PostFeedContainer>
  );
};

export default PostFeed;
