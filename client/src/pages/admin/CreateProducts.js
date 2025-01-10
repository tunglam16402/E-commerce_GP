import React, { useCallback, useEffect, useState } from 'react';
import { InputForm, Select, Button, MarkdownEditor, Loading } from 'components';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { validate, getBase64 } from 'utils/helper';
import { toast } from 'react-toastify';
import { FaTrashAlt } from 'react-icons/fa';
import { apiCreateProduct } from 'apis/product';
import { showModal } from 'store/app/appSlice';

const CreateProducts = () => {
    const { categories } = useSelector((state) => state.app);
    const dispatch = useDispatch();
    const {
        register,
        formState: { errors },
        reset,
        handleSubmit,
        watch,
    } = useForm();
    const [payload, setPayload] = useState({
        description: '',
    });
    const [preview, setPreview] = useState({
        thumb: null,
        images: [],
    });
    const [hoverElement, setHoverElement] = useState(null);

    const [invalidFields, setInvalidFields] = useState([]);

    const changeValue = useCallback(
        (e) => {
            setPayload(e);
        },
        [payload],
    );

    //handle preiview image when upload file
    const handlePreviewThumb = async (file) => {
        const base64Thumb = await getBase64(file);
        setPreview((prev) => ({ ...prev, thumb: base64Thumb }));
    };

    const handlePreviewImages = async (files) => {
        const imagesPreview = [];
        for (let file of files) {
            if (file.type !== 'image/png' && file.type !== 'image/jpeg') {
                toast.warning('File not support');
                return;
            }
            const base64 = await getBase64(file);
            imagesPreview.push({ name: file.name, path: base64 });
        }
        setPreview((prev) => ({ ...prev, images: imagesPreview }));
    };

    useEffect(() => {
        handlePreviewThumb(watch('thumb')[0]);
    }, [watch('thumb')]);

    useEffect(() => {
        handlePreviewImages(watch('images'));
    }, [watch('images')]);

    const handleCreateProduct = async (data) => {
        const invalids = validate(payload, setInvalidFields);
        if (invalids === 0) {
            if (data.category) data.category = categories?.find((element) => element._id === data.category)?.title;
            const finalPayload = { ...data, ...payload };
            const formData = new FormData();
            for (let i of Object.entries(finalPayload)) {
                formData.append(i[0], i[1]);
            }
            if (finalPayload.thumb) {
                formData.append('thumb', finalPayload.thumb[0]);
            }
            if (finalPayload.images) {
                for (let image of finalPayload.images) {
                    formData.append('images', image);
                }
            }
            dispatch(showModal({ isShowModal: true, modalChildren: <Loading></Loading> }));
            const response = await apiCreateProduct(formData);
            dispatch(showModal({ isShowModal: false, modalChildren: null }));

            if (response.success) {
                toast.success(response.message);
                reset();
                setPayload({
                    thumb: '',
                    image: '',
                });
            } else toast.error(response.message);
        }
    };

    const handleRemoveImage = (name) => {
        const files = [...watch('images')];
        reset({
            images: files?.filter((element) => element.name !== name),
        });
        if (preview.images?.some((element) => element.name === name))
            setPreview((prev) => ({ ...prev, images: prev.images?.filter((element) => element.name !== name) }));
    };

    return (
        <div>
            <div className="w-full">
                <h1 className="h-[75px] flex justify-between items-center text-3xl font-bold p-4 border-b-2 border-red-500">
                    <span>Create new product</span>
                </h1>
            </div>
            <div className="p-4">
                <form onSubmit={handleSubmit(handleCreateProduct)}>
                    <InputForm
                        label="Product name"
                        register={register}
                        errors={errors}
                        id="title"
                        validate={{
                            required: 'Need fill this fields',
                        }}
                        fullWidth
                        placeholder="Name of new product"
                    ></InputForm>
                    <div className="w-full my-6 flex gap-4">
                        <InputForm
                            label="Price"
                            register={register}
                            errors={errors}
                            id="price"
                            validate={{
                                required: 'Need fill this fields',
                            }}
                            style="flex-auto"
                            placeholder="Price of new product"
                            type="number"
                        ></InputForm>
                        <InputForm
                            label="Quantity"
                            register={register}
                            errors={errors}
                            id="quantity"
                            validate={{
                                required: 'Need fill this fields',
                            }}
                            style="flex-auto"
                            placeholder="Quantity of new product"
                            type="number"
                        ></InputForm>
                        <InputForm
                            label="Color"
                            register={register}
                            errors={errors}
                            id="color"
                            validate={{
                                required: 'Need fill this fields',
                            }}
                            style="flex-auto"
                            placeholder="Color of new product"
                        ></InputForm>
                    </div>
                    <div className="w-full my-6 flex gap-4">
                        <Select
                            label="Category"
                            options={categories?.map((element) => ({ code: element._id, value: element.title }))}
                            register={register}
                            id="category"
                            validate={{
                                required: 'Need fill this fields',
                            }}
                            style="flex-auto"
                            errors={errors}
                            fullWidth
                        ></Select>
                        <Select
                            label="Brand (Optionals)"
                            options={categories
                                ?.find((element) => element._id === watch('category'))
                                ?.brand?.map((element) => ({ code: element, value: element }))}
                            register={register}
                            id="brand"
                            style="flex-auto"
                            errors={errors}
                            fullWidth
                        ></Select>
                    </div>
                    <MarkdownEditor
                        name="description"
                        changeValue={changeValue}
                        label="Description"
                        invalidFields={invalidFields}
                        setInvalidFields={setInvalidFields}
                    ></MarkdownEditor>

                    <div className="flex flex-col gap-2 mt-8">
                        <label className="font-semibold" htmlFor="thumb">
                            Upload thumb
                        </label>
                        <input
                            type="file"
                            id="thumb"
                            lang="en"
                            {...register('thumb', { required: 'Need fill this' })}
                        ></input>
                        {errors['thumb'] && <small className="text-sm text-red-500">{errors['thumb']?.message}</small>}
                    </div>
                    {preview.thumb && (
                        <div className="my-4">
                            <img src={preview.thumb} alt="thumbnail" className="w-[200px] object-contain"></img>
                        </div>
                    )}
                    <div className="flex flex-col gap-2 mt-8">
                        <label className="font-semibold" htmlFor="products">
                            Upload images of product
                        </label>
                        <input
                            type="file"
                            id="products"
                            lang="en"
                            multiple
                            {...register('images', { required: 'Need fill this' })}
                        ></input>
                        {errors['images'] && (
                            <small className="text-sm text-red-500">{errors['images']?.message}</small>
                        )}
                    </div>
                    {preview.images.length > 0 && (
                        <div className="my-4 flex w-full gap-3 flex-wrap">
                            {preview.images?.map((element, index) => (
                                <div
                                    onMouseEnter={() => setHoverElement(element.name)}
                                    key={index}
                                    className="w-fit relative"
                                    onMouseLeave={() => setHoverElement(null)}
                                >
                                    <img src={element.path} alt="products" className="w-[200px] object-contain"></img>
                                    {hoverElement === element.name && (
                                        <div
                                            className="absolute animate-scale-up inset-0 bg-overlay flex justify-center items-center cursor-pointer"
                                            onClick={() => handleRemoveImage(element.name)}
                                        >
                                            <FaTrashAlt size={24} color="white"></FaTrashAlt>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                    <div className="mt-8">
                        <Button type="submit">Create new product</Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateProducts;
