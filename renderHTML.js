/* @flow */ 
export default ({ body, preloadedState }: Object) => (`
        <!DOCTYPE html>
        <html>
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="stylesheet" href="//www.nike.com/assets/ncss/glyphs/2.5/css/glyphs.min.css"/>
                <link rel="stylesheet" href="//www.nike.com/assets/ncss/3.0/dotcom/desktop/css/ncss.en-us.min.css"/>
            </head>
            <body>
                <div id="rootApp">${body}</div>
            </body>
            <script>
                window.__PRELOADED_STATE__ = ${preloadedState}
            </script>
            <script src="client_main.js"></script>
        </html>
    `
);