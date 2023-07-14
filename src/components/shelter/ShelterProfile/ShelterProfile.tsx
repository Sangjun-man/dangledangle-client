'use client';
import Image from 'next/image';
import { H3 } from '@/components/common/Typography';
import * as styles from './ShelterProfile.css';
import ShelterProfileEditButton from './ShelterProfileButton/ShelterProfileEditButton';
import { useAuthContext } from '@/providers/AuthContext';
import VolunteerFavoriteButtons from './VolunteerFavoriteButtons/VolunteerFavoriteButtons';

interface ProfileProps {
  shelterId: number;
  profileImageUrl: string | null;
  bankAccount: {
    accountNumber: string;
    bankName: string;
  } | null;
  shelterName: string;
}
export default function ShelterProfile({
  shelterId,
  profileImageUrl,
  shelterName,
  bankAccount
}: ProfileProps) {
  //TODO auth 상태 관리
  const auth = useAuthContext();
  const isShelterUser = 'shelterId' in auth.user; //shelterId가 있으면 True

  return (
    <>
      <div className={styles.wrapper}>
        <Image
          width={80}
          height={80}
          className={styles.profileImage}
          src={profileImageUrl || '/sparkle.png'}
          alt={`${shelterName}-profile-image`}
        />
        <div className={styles.contents}>
          <H3>{shelterName}</H3>
          {isShelterUser ? (
            <ShelterProfileEditButton />
          ) : (
            <VolunteerFavoriteButtons
              shelterId={shelterId}
              bankAccount={bankAccount}
            />
          )}
        </div>
      </div>
    </>
  );
}