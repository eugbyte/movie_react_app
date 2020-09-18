import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';
import { CardContent, Button, CardActions } from "@material-ui/core";
import Typography from '@material-ui/core/Typography';

interface IProp {
    title: string;
    textDict: Record<string, string | number>;
    imgUrl: string;
    action?: (val: any) => any;
    actionTitle?: string;
}

export function CardComponent({title, textDict, imgUrl="", action, actionTitle=""}: IProp) {
    const classes = useStyles();

    const paras: JSX.Element[] = [];
    for (let [key, value] of Object.entries(textDict)) {
        let para: JSX.Element = <Typography variant="body2" color="textSecondary" component="p" align="left" key={key}>
            <b>{key}&nbsp;</b>{value} 
        </Typography>
        paras.push(para)
    }

    return <Card className={ classes.outerCardDimensions }>
        <CardActionArea onClick={action}>
            <CardMedia 
                component="img"
                height="140"
                className={classes.cardHeight}
                image={imgUrl}
                title="https://acowebs.com/impact-ecommerce-society/"/>
        </CardActionArea>
        <CardContent>
            <Typography gutterBottom variant="h5" component="h2" color="primary">
                {title}
            </Typography>
            {paras}
        </CardContent>
        { action != null &&
            <CardActions>                
                <Button size="medium" color="primary" onClick={action}>
                    {actionTitle}
                </Button>
            </CardActions>  
        }      
    </Card>
}


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    backdrop: {
        
      zIndex: theme.zIndex.drawer + 1,
      color: "#fff"
    },
    outerCardDimensions: {
        maxWidth: 450,
        height: 400
    },
    cardHeight: {
        height: 200,
    },
  })
);