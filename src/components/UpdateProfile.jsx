"use client";

import { useState, useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import { Button, Input, Label, Modal, Surface, TextField } from "@heroui/react";
import { BiEdit, BiUser } from "react-icons/bi";

export function UpdateUserProfile({ user }) {
  const [name, setName] = useState(user?.name || "");
  const [image, setImage] = useState(user?.image || "");

  useEffect(() => {
    setName(user?.name || "");
    setImage(user?.image || "");
  }, [user]);

  const onSubmit = async (e) => {
    e.preventDefault();

    await authClient.updateUser({
      name,
      image,
    });
  };

  return (
    <Modal>
      <Button variant="secondary">
        <BiEdit /> Update Profile
      </Button>
      <Modal.Backdrop>
        <Modal.Container placement="auto">
          <Modal.Dialog className="sm:max-w-md">
            <Modal.CloseTrigger />
            <Modal.Header className="flex flex-col items-center gap-2">
              <Modal.Icon className="bg-accent-soft text-accent-soft-foreground">
                <BiUser className="size-5" />
              </Modal.Icon>
              <Modal.Heading>Update Profile</Modal.Heading>
            </Modal.Header>
            <Modal.Body className="p-6">
              <Surface variant="default">
                <form onSubmit={onSubmit} className="flex flex-col gap-4">
                  <TextField
                    className="w-full"
                    name="name"
                    type="text"
                    variant="secondary"
                  >
                    <Label>Name</Label>
                    <Input
                      placeholder="Enter your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </TextField>
                  <TextField
                    className="w-full"
                    name="image"
                    type="url"
                    variant="secondary"
                  >
                    <Label>Image</Label>
                    <Input
                      placeholder="Enter your image URL"
                      value={image}
                      onChange={(e) => setImage(e.target.value)}
                    />
                  </TextField>
                  <Modal.Footer>
                    <Button slot="close" variant="secondary">
                      Cancel
                    </Button>
                    <Button type="submit" slot="close">
                      Save
                    </Button>
                  </Modal.Footer>
                </form>
              </Surface>
            </Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
