import React, { useEffect, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Panel, PanelHeader, PanelBody } from './../../components/panel/panel.jsx';
import { AppSettings } from './../../config/app-settings.js';
import Highlight from 'react-highlight';

function PageWithBoxedLayout() {
  const context = useContext(AppSettings);
	const [code1, setCode1] = useState();

  useEffect(() => {
    context.handleSetAppBoxedLayout(true);
    
		fetch('/assets/data/page-with-boxed-layout/code-1.json').then(function(response) { return response.text(); }).then((html) => { setCode1(html); });
		
    return () => {
      context.handleSetAppBoxedLayout(false);
    };
		// eslint-disable-next-line
	}, []);

  return (
    <>
      <ol className="breadcrumb float-xl-end">
        <li className="breadcrumb-item"><Link to="/page-option/with-boxed-layout">Home</Link></li>
        <li className="breadcrumb-item"><Link to="/page-option/with-boxed-layout">Page Options</Link></li>
        <li className="breadcrumb-item active">Page with Boxed Layout</li>
      </ol>
      <h1 className="page-header">Page with Boxed Layout <small>header small text goes here...</small></h1>
      <Panel>
        <PanelHeader>Installation Settings</PanelHeader>
        <PanelBody>
          <p>
            Add the following settings into your individual page or change the variable value from <code>app.jsx</code> to make it globally affected in your app.
          </p>
        </PanelBody>
        <div className="hljs-wrapper">
          <Highlight className='typescript'>{code1}</Highlight>
        </div>
      </Panel>
    </>
  );
}

export default PageWithBoxedLayout;