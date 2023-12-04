"use client";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { Button, TextInput } from "flowbite-react";
import React, { useEffect } from "react";
import { FieldValues, useForm } from "react-hook-form";
import Input from "../components/Input";
import DateInput from "../components/DateInput";
import { createAuction, updateAuction } from "../actions/AuctionAction";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Auction } from "@/types";
import { confirmAlert } from 'react-confirm-alert';

type Props = {
  auction?: Auction;
};

export default function AuctionForm({ auction }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const {
    control,
    handleSubmit,
    setFocus,
    reset,
    formState: { isSubmitting, isValid }} = useForm({
    mode: "onTouched",
  });

  useEffect(() => {
    if (auction) {
      const { make, model, color, mileage, year } = auction;
      reset({make, model, color, mileage, year});
    }
    setFocus('make');
  }, [setFocus,reset,auction])


  const showConfirmationDialog = (actionType: 'create' | 'update') => {
    return new Promise<boolean>((resolve) => {
      const confirmationMessage =
        actionType === 'create'
          ? 'Are you sure you want to create this auction?'
          : 'Are you sure you want to update this auction?';
  
      confirmAlert({
        title: 'Confirm Action',
        message: confirmationMessage,
        buttons: [
          {
            label: 'Yes',
            onClick: () => resolve(true),
          },
          {
            label: 'No',
            onClick: () => resolve(false),
          },
        ],
      });
    });
  };


  async function onSubmit(data: FieldValues) {  
    try {
      const actionType = pathname === '/auctions/create' ? 'create' : 'update';
      const shouldProceed = await showConfirmationDialog(actionType); 
      let id='';
      let res ;
      if (pathname === '/auctions/create') {
        if(shouldProceed) {
          res = await createAuction(data);
          toast.success('car added successfully')
          id = res.id;
        }else return
       
      } else {
        if (auction) {
          if(shouldProceed){
            res = await updateAuction(data, auction.id);
            toast.success('car updated successfully')
            id = res.id;
          }else return
        }
      }
      if (res.err) {
        throw res.err;
      } 
      router.push(`/auctions/details/${id}`);
      
    } catch (err: any) {
      toast.error(err.status + " " + err.message);
    }
  }
  return (
    <form
      action=""
      className="flex flex-col mt-3"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input
        label="Make"
        name="make"
        control={control}
        rules={{ required: "Make is require" }}
      />
      <Input
        label="Model"
        name="model"
        control={control}
        rules={{ required: "Model is require" }}
      />
      <Input
        label="Color"
        name="color"
        control={control}
        rules={{ required: "Color is require" }}
      />
      <div className="grid grid-cols-2 gap-3">
        <Input
          label="Year"
          name="year"
          control={control}
          type="number"
          rules={{ required: "Year is require" }}
        />
        <Input
          label="Mileage"
          name="mileage"
          control={control}
          type="number"
          rules={{ required: "Mileage is require" }}
        />
      </div>
      {pathname === '/auctions/create' && 
        <>
          <Input
            label="Image URl"
            name="imageUrl"
            control={control}
            rules={{ required: "Image Url is require" }}
          />
          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Reserve Price (enter 0 if no reserve)"
              name="reservePrice"
              control={control}
              type="number"
              rules={{ required: "Reserve Prcice is require" }}
            />
            <DateInput
              label="Auction End date/time"
              name="auctionEnd"
              control={control}
              dateFormat="dd MMMM  yyyy h:mm a"
              showTimeSelect
              rules={{ required: "Auction End date is require" }}
            />
          </div>
        </>
      }

      <div className="flex justify-between">
        <Button outline color="gray">
          Cancel
        </Button>
        <Button
          outline
          color="success"
          isProcessing={isSubmitting}
          disabled={!isValid}
          type="submit"
        >
          <FontAwesomeIcon className='flex justify-between text-lg' icon={faCheck} /> submit
        </Button>
      </div>
    </form>
  );
}
