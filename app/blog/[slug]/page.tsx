// app/blog/[slug]/page.tsx
import { constructMetadata } from "@/config/utils";

export const generateMetadata = ({ params }: { params: { slug: string } }) => {
  return constructMetadata({
    title: "blogPost.title",
    description: "blogPost.excerpt",
    image: "blogPost.coverImage",
  });
};

const SingleBlogpage = () => {
  return <div>SingleBlogpage</div>;
};
export default SingleBlogpage;
