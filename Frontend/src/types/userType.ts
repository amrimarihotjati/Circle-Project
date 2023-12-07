export type InterfaceUser = {
	id?: number;
	full_name?: string;
	username?: string;
	email?: string;
	photo_profile?: string;
	following?: [];
	followers?: [];
	bio?: string;
	like?: [] | undefined; // Make it optional
  };
  
export type InterfaceUserRegister = {
	full_name: string;
	username: string;
	email: string;
	password: string;
};

export type InterfaceUserLogin = {
	email: string;
	password: string;
};
