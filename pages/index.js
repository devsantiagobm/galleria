import data from "../data/data";
import styled from "styled-components"
import Picture from "../components/Picture";
import Layout from "../components/Layout";

const HomeBox = styled.div`
   columns: 4 250px;
   column-gap: 32px;
   gap: 32px;
   margin: 48px 0;
   position: relative;
`

export default function Home() {
   return (
      <Layout>
         <div className="home">
            <HomeBox>
               {
                  data.map(picture => <Picture key={picture.name} picture={picture} />)
               }
            </HomeBox>
         </div>
      </Layout>
   )
}
