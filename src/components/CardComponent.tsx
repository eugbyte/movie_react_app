import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';
import { CardContent, Button, CardActions } from "@material-ui/core";
import Typography from '@material-ui/core/Typography';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

interface IProp {
    title: string;
    textDict: Record<string, string | number>;
    imgUrl: string;
    action?: (val: any) => any;
    actionTitle?: string;
    showAccordion?: boolean;
    accordionText?: string;
}

export function CardComponent({title, textDict, imgUrl="", action, actionTitle="", showAccordion=false, accordionText=""}: IProp) {
    const classes = useStyles();

    const paras: JSX.Element[] = [];
    for (let [key, value] of Object.entries(textDict)) {
        let para: JSX.Element = <Typography variant="body2" color="textSecondary" component="p" align="left" key={key}>
            <b>{key}&nbsp;</b>{value} 
        </Typography>
        paras.push(para)
    }

    return <Card className={ showAccordion ? classes.expandedDimension : classes.minifiedDimensions }>
        <CardActionArea onClick={action}>
            <CardMedia 
                component="img"
                //height="140"
                className={classes.cardHeight}
                image={imgUrl}
                title={imgUrl}/>
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

        { showAccordion &&
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header" >
                        <Typography color="textSecondary">Show more</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    {accordionText}
                </AccordionDetails>
        </Accordion> 
        }


        
    </Card>
}


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    backdrop: {        
      zIndex: theme.zIndex.drawer + 1,
      color: "#fff"
    },
    minifiedDimensions: {
        maxWidth: 440,
        height: 450
    },
    expandedDimension: {
        width: 800,
    },
    cardHeight: {
        height: 200,
    },
  })
);