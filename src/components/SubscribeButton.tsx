"use client";
import { useUser } from "@/context/userContext";
import { SubscriptionType } from "@/lib/definitions";
import { subscribe, unsubscribe } from "@/services/userService";
import { useEffect, useRef, useState } from "react";
import { Modal } from "./Modal";
import { useTranslations } from "next-intl";

interface SubscribeButtonProps {
  subscribeTo: SubscriptionType;
}

export const SubscribeButton = ({ subscribeTo }: SubscribeButtonProps) => {
  const t = useTranslations("SubscribeButton");
  const { user, token, updateUser } = useUser();
  const [isSubscribed, setIsSubscribed] = useState(
    user?.subscribedUsers.some((subs) => subs.id === subscribeTo.id)
  );
  const modalRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    setIsSubscribed(
      user?.subscribedUsers.some((subs) => subs.id === subscribeTo.id)
    );
  }, [user]);

  const handleUnsubscribe = () => {
    if (user && token && updateUser) {
      unsubscribe(user.id, subscribeTo.id, token);
      const updatedSubscribers = user.subscribedUsers.filter(
        (subs) => subs.id !== subscribeTo.id
      );
      const updatedUser = { ...user, subscribedUsers: updatedSubscribers };
      updateUser(updatedUser);
    }
  };

  const handleSubscribe = () => {
    if (!user) {
      modalRef.current?.showModal();
      return;
    }

    if (user && token && updateUser) {
      subscribe(user.id, subscribeTo.id, token);
      const updatedSubscribers = [
        ...user.subscribedUsers,
        {
          id: subscribeTo.id,
          name: subscribeTo.name,
          profileImageUrl: subscribeTo.profileImageUrl,
        },
      ];
      const updatedUser = { ...user, subscribedUsers: updatedSubscribers };
      updateUser(updatedUser);
    }
  };

  return (
    <>
      {isSubscribed ? (
        <button
          onClick={handleUnsubscribe}
          className="btn btn-primary flex items-center gap-2 font-bold text-white text-lg px-4 py-2 rounded-full"
        >
          {t("unsubscribe")}
        </button>
      ) : (
        <>
          <button
            onClick={handleSubscribe}
            disabled={user?.id == subscribeTo.id}
            className="btn btn-primary flex items-center gap-2 font-bold text-white text-lg px-4 py-2 rounded-full"
          >
            {t("subscribe")}
          </button>
          <Modal
            type="Login"
            title={t("modalTitle")}
            text={t("modalText")}
            ref={modalRef}
          />
        </>
      )}
    </>
  );
};
