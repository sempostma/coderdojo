import React from 'react'
import Helmet from 'react-helmet'
import { Link, graphql } from 'gatsby'
import get from 'lodash/get'
import { Col, Row, Grid } from 'react-bootstrap';

import Bio from '../../components/Bio/Bio'
import Layout from '../../components/Layout/Layout'

class LesTemplate extends React.Component {
    render() {
      console.log(this);
        const les = this.props.data.markdownRemark
        const siteTitle = get(this.props, 'data.site.siteMetadata.title');
        const meerLessen = get(this.props, 'data.meerLessen.edges');
        const siteDescription = les.excerpt
        const { previous, next } = this.props.pageContext

        console.log(meerLessen);

        return (
            <Layout location={this.props.location} title={siteTitle}>
                <Helmet
                    htmlAttributes={{ lang: 'en' }}
                    meta={[{ name: 'description', content: siteDescription }]}
                    title={`${les.frontmatter.title} | ${siteTitle}`}
                />
                <Grid>
                    <Row>
                        <Col>
                            <h1>{les.frontmatter.title}</h1>
                            <p
                                style={{
                                    display: 'block',
                                }}
                            >
                                {les.frontmatter.date}
                            </p>
                            <div dangerouslySetInnerHTML={{ __html: les.html }} />
                            <hr
                                style={{
                                }}
                            />
                            <Bio />

                            <ul
                                style={{
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    justifyContent: 'space-between',
                                    listStyle: 'none',
                                    padding: 0,
                                }}
                            >
                                <li>
                                    {
                                        previous &&
                                        <Link to={previous.fields.slug} rel="prev">
                                            ← {previous.frontmatter.title}
                                        </Link>
                                    }
                                </li>
                                <li>
                                    {
                                        next &&
                                        <Link to={next.fields.slug} rel="next">
                                            {next.frontmatter.title} →
                                        </Link>
                                    }
                                </li>
                            </ul>
                        </Col>
                    </Row>
                    <Row>
                      {meerLessen.map(les => {

                        return (
                          <div></div>
                        );
                      })}
                      <Col xs={12}></Col>
                    </Row>
                </Grid>
            </Layout>
        )
    }
}

export default LesTemplate


export const pageQuery = graphql`
query lesIntroductieBySlug($slug: String!, $les: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: {slug: {eq: $slug}}) {
      id
      excerpt
      html
      fields {
        les
        slug
      }
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
      }
    }
    meerLessen: allMarkdownRemark(filter: {fields: {les: {eq: $les}}}, sort: {order: DESC, fields: [frontmatter___date]}) {
      edges {
        node {
          fields {
            slug
            les
          }
          excerpt(pruneLength: 250)
          html
          frontmatter {
            title
            layout
          }
        }
      }
    }
  }
`  