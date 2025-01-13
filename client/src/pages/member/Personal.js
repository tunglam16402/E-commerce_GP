import { Button, InputForm } from 'components';
import moment from 'moment';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import avatarDefault from 'assets/img/avt_default.png';
import { apiUpdateCurrent } from 'apis';
import { getCurrent } from 'store/users/asyncAction';
import { toast } from 'react-toastify';
import { useSearchParams } from 'react-router-dom';
import withBaseComponent from 'hocs/withBaseComponent';

const Personal = ({ dispatch, navigate }) => {
    const {
        register,
        formState: { errors, isDirty },
        handleSubmit,
        reset,
    } = useForm();
    const { current } = useSelector((state) => state.user);
    const [searchParams] = useSearchParams();

    useEffect(() => {
        reset({
            firstname: current?.firstname,
            lastname: current?.lastname,
            mobile: current?.mobile,
            email: current?.email,
            avatar: current?.avatar,
            address: current?.address,
        });
    }, [current]);

    const handleUpdateInfo = async (data) => {
        const formData = new FormData();
        if (data.avatar.length > 0) {
            formData.append('avatar', data.avatar[0]);
        }
        delete data.avatar;
        for (let i of Object.entries(data)) {
            formData.append(i[0], i[1]);
        }

        const response = await apiUpdateCurrent(formData);
        if (response.success) {
            dispatch(getCurrent());
            toast.success(response.message);
            if (searchParams?.get('redirect')) {
                navigate(searchParams.get('redirect'));
            }
        } else toast.error(response.message);
    };

    return (
        <div className="w-full relative px-4">
            <header className="text-3xl font-semibold py-4 border-b border-main">Personal</header>
            <form onSubmit={handleSubmit(handleUpdateInfo)} className="w-3/5 mx-auto py-8 flex flex-col gap-4">
                <InputForm
                    label="First name"
                    register={register}
                    errors={errors}
                    id="firstname"
                    validate={{
                        required: 'Need fill this fields',
                    }}
                    fullWidth
                />
                <InputForm
                    label="last name"
                    register={register}
                    errors={errors}
                    id="lastname"
                    validate={{
                        required: 'Need fill this fields',
                    }}
                    fullWidth
                />
                <InputForm
                    label="Email address"
                    register={register}
                    errors={errors}
                    id="email"
                    validate={{
                        required: 'Need fill this fields',
                        pattern: {
                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                            message: 'Email invalid.',
                        },
                    }}
                    fullWidth
                />
                <InputForm
                    label="Phone number"
                    register={register}
                    errors={errors}
                    id="mobile"
                    validate={{
                        required: 'Need fill this fields',
                        pattern: {
                            value: /^[\+]?[(]?[0-9]{3}[)]?[-\s\ .]?[0-9]{3}[-\s\.]?[0-9]{4}$/gm,
                            message: 'Phone invalid.',
                        },
                    }}
                    fullWidth
                />
                <InputForm
                    label="Shipping address"
                    register={register}
                    errors={errors}
                    id="address"
                    validate={{
                        required: 'Need fill this fields',
                    }}
                    fullWidth
                />
                <div className="flex items-center gap-2">
                    <span className="font-medium">Account status:</span>
                    <span>{current?.isBlocked ? 'Blocked' : 'Actived'}</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="font-medium">Role:</span>
                    <span>{+current?.role === 2002 ? 'Admin' : 'User'}</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="font-medium">Created At:</span>
                    <span>{moment(current?.createdAt).fromNow()}</span>
                </div>
                <div className="flex flex-col gap-2">
                    <span className="font-medium">Profile image:</span>
                    <label htmlFor="file">
                        <img
                            src={current?.avatar || avatarDefault}
                            alt="avatar"
                            className="w-24 h-24 ml-8 object-cover rounded-full"
                        ></img>
                    </label>
                    <input type="file" id="file" {...register('avatar')} hidden></input>
                </div>
                {isDirty && (
                    <div className="w-full flex justify-end">
                        <Button type="submit">Update information</Button>
                    </div>
                )}
            </form>
        </div>
    );
};

export default withBaseComponent(Personal);
