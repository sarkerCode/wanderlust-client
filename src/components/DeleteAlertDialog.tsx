"use client"

import { Trash2Icon } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { redirect } from "next/navigation";
import { getTokenFromClient } from "@/lib/getTokenFromClient";

const DeleteAlertDialog = ({id}: {id: string}) => {

    const handleDeleteDestination = async () => {

      const token = await getTokenFromClient();
        const res = await fetch(`http://localhost:8000/destination/${id}`, {
            method: "DELETE",
            headers: {
              authorization: `Bearer ${token}`,
            }
        });

        const data = await res.json();
        console.log(data);
        redirect("/destinations");

    }

    return (
        <AlertDialog>
      <AlertDialogTrigger
        render={<Button
                      variant="outline"
                      className="border-red-200 bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-400"
                    >
                      <Trash2Icon data-icon="inline-start" className="size-3.5" />
                      Delete
                    </Button>}
      />
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
            <Trash2Icon />
          </AlertDialogMedia>
          <AlertDialogTitle>Delete Destination</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete this destination. View{" "}
            <a href="#">Settings</a> delete any memories saved during this chat.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel variant="outline">Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDeleteDestination} variant="destructive">
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
    );
};

export default DeleteAlertDialog;