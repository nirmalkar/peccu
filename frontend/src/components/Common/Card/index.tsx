import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import * as React from 'react';

interface OutlinedCardProps {
  title?: string;
  content?: React.ReactNode;
  buttonText?: string;
  onButtonClick?: () => void;
  imageSrc?: string;
  imageAlt?: string;
  linkHref?: string;
  loading?: boolean;
  customStyles?: {
    cardContainer?: React.CSSProperties;
    title?: React.CSSProperties;
    content?: React.CSSProperties;
    button?: React.CSSProperties;
    cardMedia?: React.CSSProperties;
  };
}

/**
 * OutlinedCard component
 *
 * @example
 * <OutlinedCard title="Example Card" content="This is an example card" />
 *
 * @param {OutlinedCardProps} props Component props
 * @param {string} [props.title] Card title
 * @param {React.ReactNode} [props.content] Card content
 * @param {string} [props.buttonText] Button text
 * @param {() => void} [props.onButtonClick] Button click handler
 * @param {string} [props.imageSrc] Image source
 * @param {string} [props.imageAlt] Image alt text
 * @param {string} [props.loading] Loading state
 * @param {React.CSSProperties} [props.customStyles.cardContainer] Card container styles
 * @param {React.CSSProperties} [props.customStyles.title] Title styles
 * @param {React.CSSProperties} [props.customStyles.content] Content styles
 * @param {React.CSSProperties} [props.customStyles.button] Button styles
 * @param {React.CSSProperties} [props.customStyles.cardMedia] Card media styles
 * @returns {React.ReactElement} OutlinedCard component
 */

const OutlinedCard: React.FC<OutlinedCardProps> = ({
  title,
  content,
  buttonText,
  onButtonClick,
  imageSrc,
  imageAlt,
  loading,
  customStyles = {},
  linkHref = '#',
}) => {
  return (
    <Box
      sx={{
        minWidth: 'auto',
        ...customStyles.cardContainer,
      }}
    >
      <Link style={{ textDecoration: 'none' }} href={linkHref} passHref>
        <Card sx={{ minHeight: 150 }} variant="outlined">
          {imageSrc && (
            <CardMedia
              sx={{
                minHeight: 80,
                ...customStyles.cardMedia,
              }}
              image={imageSrc}
              title={imageAlt}
            />
          )}
          {loading && <CardContent>Loading...</CardContent>}
          <CardContent>
            <Typography
              sx={{
                ...customStyles.title,
                display: '-webkit-box',
                WebkitBoxOrient: 'vertical',
                WebkitLineClamp: 1,
                overflow: 'hidden',
              }}
              gutterBottom
              fontWeight={700}
              component="div"
            >
              {title}
            </Typography>
            <Typography
              sx={{
                display: '-webkit-box',
                WebkitBoxOrient: 'vertical',
                WebkitLineClamp: 3,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'normal',
                color: 'text.secondary',
              }}
              variant="body2"
            >
              {content}
            </Typography>
          </CardContent>
          <CardActions>
            {buttonText && (
              <Button
                size="small"
                onClick={onButtonClick}
                sx={{ ...customStyles.button }}
              >
                {buttonText}
              </Button>
            )}
          </CardActions>
        </Card>
      </Link>
    </Box>
  );
};

export default OutlinedCard;
