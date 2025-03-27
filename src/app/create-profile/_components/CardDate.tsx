import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

export function CardDate({ control }) {
  return (
    <div>
      <div className="flex gap-4 justify-between">
        <FormField
          control
          name="Expires"
          render={({ field }) => (
            <FormItem className="w-[100%]">
              <FormLabel>Expires</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Month"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />{" "}
        <FormField
          control
          name="Year"
          render={({ field }) => (
            <FormItem className="w-[100%]">
              <FormLabel>Year</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Year"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />{" "}
        <FormField
          control
          name="CVC"
          render={({ field }) => (
            <FormItem className="w-[100%]">
              <FormLabel>CVC</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="CVC"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
