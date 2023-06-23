import * as yup from 'yup';

yup.setLocale({
  mixed: {
    default: '사용할 수 없는 값입니다.',
    required: '필수 입력 항목입니다.',
    oneOf: '다음 값 중 하나여야 합니다.: ${values}',
    notOneOf: '다음 값 중 하나가 아니어야 합니다.: ${values}',
    notType: function notType(_ref: any) {
      const type = _ref.type;

      let msg;
      if (type === 'number') {
        msg = '숫자만 입력 가능합니다.';
      } else if (type === 'date') {
        msg = '날짜 형식으로만 입력 가능합니다.';
      } else if (type === 'object') {
        msg = '옵션을 선택해주세요.';
      } else {
        msg = '해당 항목은 `' + type + '` 형식으로 입력해주세요.';
      }

      return msg;
    },
    defined: '정의되지 않았습니다.'
  },
  string: {
    length: '${length}자로 입력해주세요.',
    min: '${min}자 이상 입력바랍니다.',
    max: '${max}자 이하로 입력바랍니다.'
  }
});

export const loginValidation = yup.object().shape({
  email: yup
    .string()
    .required('필수항목 입니다.')
    .email('올바른 이메일 형식이 아닙니다.'),
  password: yup
    .string()
    .required()
    .min(8, '비밀번호가 너무 짧습니다. 8~15자로 입력해주세요.')
    .matches(
      /(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])/,
      '영문, 숫자, 특수문자 2가지 조합 8~15자로 입력해주세요.'
    )
    .max(15, '비밀번호가 너무 깁니다. 8~15자로 입력해주세요.')
});

export const passWordFindValidation = yup.object().shape({
  email: yup
    .string()
    .required('필수항목 입니다.')
    .email('올바른 이메일 형식이 아닙니다.')
});

export const registerValidation = yup.object({
  email: yup.string().email('올바른 이메일 형식이 아닙니다.'),
  password: yup
    .string()
    .min(8, '비밀번호가 너무 짧습니다. 8~15자로 입력해주세요.')
    .matches(
      /(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])/,
      '영문, 숫자, 특수문자 2가지 조합 8~15자로 입력해주세요.'
    )
    .max(15, '비밀번호가 너무 깁니다. 8~15자로 입력해주세요.'),
  passwordConfirm: yup
    .string()
    .optional()
    .oneOf([yup.ref('password'), undefined], '비밀번호가 일치하지 않습니다.'),
  name: yup
    .string()
    .max(20)
    .test(
      'no-emoji',
      '이모티콘은 사용할 수 없습니다.',
      (value = '') =>
        !/(\p{Emoji_Presentation}|\p{Extended_Pictographic})/gu.test(value)
    ),
  phoneNumber: yup
    .string()
    .matches(
      /^(01[0-9]{1}|(02|0[3-9]{2}))[0-9]{3,4}[0-9]{4}$/,
      '전화번호 형식이 아닙니다.'
    ),
  address: yup.object().shape({
    address: yup.string().required(),
    addressDetail: yup.string(),
    postalCode: yup.string().required(),
    latitude: yup.number().required(),
    longitude: yup.number().required()
  }),
  description: yup.string().max(300, '입력 가능 글자수를 초과했어요.')
});
