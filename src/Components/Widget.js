import React from 'react';
import { Grid, Image } from 'semantic-ui-react';

const Widget = ({ data }) => {
    const {
        icon_path,
        title,
        desc,
        link
    } = data;

    const onClick = () => {
        window.location = link;
    }
    return (
        <Grid columns='equal'>
            <Grid.Column/>
            <Grid.Column width={12}>
                <Grid celled>
                    <Grid.Row verticalAlign='middle' >
                        <Grid.Column width={3}>
                            <Image className='img-icon' onClick={onClick} centered='true' size='small' src={icon_path}/>
                        </Grid.Column>
                        <Grid.Column width={13}>
                            <h3>{title}</h3>
                            <p>{desc}</p>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Grid.Column>
            <Grid.Column/>
        </Grid>
    );
};


export default Widget;
