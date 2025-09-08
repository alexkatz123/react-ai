'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { roastPicture } from '@/lib/roast';
import {
  Dropzone,
  DropzoneContent,
  DropzoneEmptyState,
} from '@/components/dropzone';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Loader2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type RoastFormValues = {
  image: File[];
  mode: 'roast' | 'compliment' | 'random' | 'ai_decide';
};

export default function RoastPage() {
  const [reply, setReply] = useState('');
  const [loading, setLoading] = useState(false);

  const form = useForm<RoastFormValues>({
    defaultValues: { image: [], mode: 'roast' },
  });

  async function onSubmit(values: RoastFormValues) {
    if (!values.image?.[0]) return;

    setReply('');
    setLoading(true);

    const result = await roastPicture(values.image[0], values.mode);

    if (result.ok && result.reply) {
      setReply(result.reply);
    } else {
      form.setError('image', {
        type: 'manual',
        message: result.error || 'Something went wrong',
      });
    }

    setLoading(false);
  }

  return (
    <div className="max-w-xl mx-auto py-10 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Upload a Picture to Get Roasted 🔥</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Dropzone
                        accept={{ 'image/*': [] }}
                        maxFiles={1}
                        src={field.value}
                        onDrop={(accepted) => field.onChange(accepted)}
                      >
                        <DropzoneContent />
                        <DropzoneEmptyState />
                      </Dropzone>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="mode"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" className="w-full">
                            {field.value}
                            <span className="ml-2">▼</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-full">
                          <DropdownMenuLabel>Choose Mode</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => field.onChange('roast')}>Roast</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => field.onChange('compliment')}>Compliment</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => field.onChange('random')}>Random</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => field.onChange('ai_decide')}>AI Decide</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                disabled={loading}
                className="w-full"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin mr-2 h-4 w-4" />
                    Roasting…
                  </>
                ) : (
                  'Roast Me'
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {reply && (
        <Card>
          <CardHeader>
            <CardTitle>Your Roast</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground whitespace-pre-line">{reply}</p>
          </CardContent>
          
        </Card>
      )}
    </div>
  );
}
