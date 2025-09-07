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

type RoastFormValues = {
  image: File[];
};

export default function RoastPage() {
  const [reply, setReply] = useState('');
  const [loading, setLoading] = useState(false);

  const form = useForm<RoastFormValues>({
    defaultValues: { image: [] },
  });

  async function onSubmit(values: RoastFormValues) {
    if (!values.image?.[0]) return;

    setReply('');
    setLoading(true);

    const result = await roastPicture(values.image[0]);

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
