// import React, { useState } from 'react';
// import { TextInput, View, TouchableOpacity, Text } from 'react-native';
// import { useSignUp } from '@clerk/clerk-expo';
// import { useRouter, Link } from 'expo-router';
// import { images } from '../../constants';
// import { Image } from 'react-native';

// export default function SignUpScreen() {
//   const { isLoaded, signUp, setActive } = useSignUp();
//   const router = useRouter();

//   const [emailAddress, setEmailAddress] = useState('');
//   const [password, setPassword] = useState('');
//   const [pendingVerification, setPendingVerification] = useState(false);
//   const [code, setCode] = useState('');

//   const onSignUpPress = async () => {
//     if (!isLoaded) {
//       return;
//     }

//     try {
//       await signUp.create({
//         emailAddress,
//         password,
//       });

//       await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });

//       setPendingVerification(true);
//     } catch (err) {
//       console.error(JSON.stringify(err, null, 2));
//     }
//   };

//   const onPressVerify = async () => {
//     if (!isLoaded) {
//       return;
//     }

//     try {
//       const completeSignUp = await signUp.attemptEmailAddressVerification({
//         code,
//       });

//       if (completeSignUp.status === 'complete') {
//         await setActive({ session: completeSignUp.createdSessionId });
//         router.replace('/');
//       } else {
//         console.error(JSON.stringify(completeSignUp, null, 2));
//       }
//     } catch (err) {
//       console.error(JSON.stringify(err, null, 2));
//     }
//   };

//   return (
//     <View className="flex-1 p-5 justify-center bg-[#F0F4EF]">
//       <Image className="mb-8 self-center" source={images.logo} />
//       {!pendingVerification && (
//         <>
//           <TextInput
//             className="h-12 mb-4 border-b border-[#4CAF50] bg-transparent text-base p-2"
//             autoCapitalize="none"
//             value={emailAddress}
//             placeholder="Email..."
//             placeholderTextColor="#256509" // Match Sign In placeholder
//             onChangeText={(email) => setEmailAddress(email)}
//           />
//           <TextInput
//             className="h-12 mb-4 border-b border-[#4CAF50] bg-transparent text-base p-2"
//             value={password}
//             placeholder="Password..."
//             secureTextEntry={true}
//             placeholderTextColor="#256509" // Match Sign In placeholder
//             onChangeText={(password) => setPassword(password)}
//           />
//           <TouchableOpacity className="bg-[#1c771f] rounded-full py-3 shadow-md mb-5 mt-5" onPress={onSignUpPress}>
//             <Text className="text-white font-bold text-lg text-center">Sign Up</Text>
//           </TouchableOpacity>
//         </>
//       )}
//       {pendingVerification && (
//         <>
//           <TextInput
//             className="h-12 mb-4 border-b border-[#4CAF50] bg-transparent text-base p-2"
//             value={code}
//             placeholder="Code..."
//             placeholderTextColor="#256509" // Match Sign In placeholder
//             onChangeText={(code) => setCode(code)}
//           />
//           <TouchableOpacity className="bg-[#4CAF50] rounded-full py-3 shadow-md mb-5" onPress={onPressVerify}>
//             <Text className="text-white font-bold text-lg text-center">Verify Email</Text>
//           </TouchableOpacity>
//         </>
//       )}
//       <View className="mt-5 items-center">
//         <Text className="text-[#4CAF50] text-lg">Have an account already?</Text>
//         <Link href="/sign-in">
//           <Text className="text-[#4CAF50] font-bold mt-1 text-lg underline">Sign in</Text>
//         </Link>
//       </View>
//     </View>
//   );
// }
import * as React from 'react'
import { TextInput, Button, View } from 'react-native'
import { useSignUp } from '@clerk/clerk-expo'
import { useRouter } from 'expo-router'

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp()
  const router = useRouter()

  const [firstName, setFirstName] = React.useState('')
  const [lastName, setLastName] = React.useState('')
  const [emailAddress, setEmailAddress] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [pendingVerification, setPendingVerification] = React.useState(false)
  const [code, setCode] = React.useState('')

  const onSignUpPress = async () => {
    if (!isLoaded) {
      return
    }

    try {
      await signUp.create({
        first_name: firstName,  // Add first name
        last_name: lastName,    // Add last name
        emailAddress,
        password,
      })

      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })

      setPendingVerification(true)
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2))
    }
  }

  const onPressVerify = async () => {
    if (!isLoaded) {
      return
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      })

      if (completeSignUp.status === 'complete') {
        await setActive({ session: completeSignUp.createdSessionId })
        router.replace('/')
      } else {
        console.error(JSON.stringify(completeSignUp, null, 2))
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2))
    }
  }

  return (
    <View className='mt-20'>
      {!pendingVerification && (
        <>
          <TextInput
            autoCapitalize="none"
            value={firstName}
            placeholder="First Name..."
            onChangeText={setFirstName}
          />
          <TextInput
            autoCapitalize="none"
            value={lastName}
            placeholder="Last Name..."
            onChangeText={setLastName}
          />
          <TextInput
            autoCapitalize="none"
            value={emailAddress}
            placeholder="Email..."
            onChangeText={(email) => setEmailAddress(email)}
          />
          <TextInput
            value={password}
            placeholder="Password..."
            secureTextEntry={true}
            onChangeText={(password) => setPassword(password)}
          />
          <Button title="Sign Up" onPress={onSignUpPress} />
        </>
      )}
      {pendingVerification && (
        <>
          <TextInput value={code} placeholder="Code..." onChangeText={(code) => setCode(code)} />
          <Button title="Verify Email" onPress={onPressVerify} />
        </>
      )}
    </View>
  )
}