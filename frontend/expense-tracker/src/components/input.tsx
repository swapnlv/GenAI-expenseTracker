import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import IconButton from '@mui/joy/IconButton';
import Textarea from '@mui/joy/Textarea';
import Typography from '@mui/joy/Typography';

interface TextareaDecoratorsProps {
    value: string;
    onChange: (value: string) => void;
  }
  
  export default function TextareaDecorators({ value, onChange }: TextareaDecoratorsProps) {
    const addEmoji = (emoji: string) => () => onChange(`${value}${emoji}`);
  
    return (
      <Textarea
        style={{
          backgroundColor: '#1e293b',
          color: '#f8fafc',
          border: '1px solid #475569',
          borderRadius: '8px',
          width: '100%',
          padding: '0.75rem',
          fontSize: '1rem',
          resize: 'vertical',
        }}
        placeholder="Share your expenses here, we'll help you track them! 😊"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        minRows={2}
        maxRows={4}
        startDecorator={
          <Box sx={{ display: 'flex', gap: 0.5, flex: 1 }}>
            <IconButton variant="outlined" color="neutral" onClick={addEmoji('👍')}>👍</IconButton>
            <IconButton variant="outlined" color="neutral" onClick={addEmoji('🏖')}>🏖</IconButton>
            <IconButton variant="outlined" color="neutral" onClick={addEmoji('😍')}>😍</IconButton>
            <Button variant="outlined" color="neutral" sx={{ ml: 'auto' }}>See all</Button>
          </Box>
        }
        endDecorator={
          <Typography level="body-xs" sx={{ ml: 'auto' }}>
            {value.length} character(s)
          </Typography>
        }
        sx={{ minWidth: 600, minHeight: 200 }}
      />
    );
  }
