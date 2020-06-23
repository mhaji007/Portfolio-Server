// Mock data for populating the collection

const data = {
    portfolios: [
        {
          title: 'School Contribution',
          company: 'Florida International University',
          companyWebsite: 'https://webserver.cis.fiu.edu/',
          location: 'Florida, United Atates',
          jobTitle: 'Engineer',
          description: 'Reviewed papers and articles prior to submission',
          userId: 'auth0|5ed95170a36eb2001976617a',
          startDate: '10/04/2016',
          endDate: '11/06/2016'
        },
        {
          title: 'Internship',
          company: 'Accelirate',
          companyWebsite: 'https://www.accelirate.com/',
          location: 'Florida, United States',
          jobTitle: 'Automation Engineer Intern',
          description: 'Was trained in Ui-Path platform. Automised backoffice repetetive tasks',
          userId: 'auth0|5ed95170a36eb2001976617a',
          startDate: '05/08/2019',
          endDate: '07/20/2019'
        },
        {
          title: 'Professional Experience',
          company: 'SmartsAid',
          companyWebsite: 'https://play.google.com/store/apps/details?id=com.mehdi.smartsaid&hl=en_US',
          location: 'Florida, United States',
          jobTitle: 'Software Developer',
          description: 'Designed and developed the SmartsAid app',
          userId: 'auth0|5ed95170a36eb2001976617a',
          startDate: '05/20/2018',
          endDate: '02/01/2020'
        }
      ],
      blogs: [
        {
          slug: 'my-first-blog',
          title: 'My First Blog',
          subTitle: 'It was chilly winter day...',
          content: '<p>Some very nice content</p>',
          userId: 'auth0|5ed95170a36eb2001976617a',
          status: 'published'
        },
        {
          slug: 'my-second-blog',
          title: 'My Second Blog',
          subTitle: 'It was hot summer day...',
          content: '<p>Some very nice content</p>',
          userId: 'auth0|5ed95170a36eb2001976617a',
          status: 'published'
        },
        {
          slug: 'my-third-blog',
          title: 'My Third Blog',
          subTitle: 'It was rainy spring day...',
          content: '<p>Some very nice content</p>',
          userId: 'auth0|5ed95170a36eb2001976617a',
          status: 'published'
        }
      ]
}

module.exports = data;